const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const { Product } = require("../models/product");
const { Category } = require("../models/category");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", async (req, res) => {
  let filter = {};

  if (req.query.categories) {
    filter = { category: req.query.categories.split(", ") };
  }

  try {
    const productList = await Product.find(filter).populate("category");

    if (!productList) {
      return res
        .status(500)
        .json({ success: false, message: "The product was not found...👎" });
    } else {
      return res.status(200).send(productList);
      console.log(productList);
    }
  } catch (err) {
    console.error(err.message);
    console.log("Server Error...🦠");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "The product with the given ID was not found...👎",
      });
    } else {
      return res.status(200).send(product);
      console.log(product);
    }
  } catch (err) {
    console.error(err.message);
    console.log("Server Error...🦠");
  }
});

router.post("/", uploadOptions.single("image"), async (req, res) => {
  const createdCategory = await Category.findById(req.body.category);

  if (!createdCategory) {
    return res.status(400).send("Invalid Category...👎");
  }

  try {
    const {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No image in the request...👎" });
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;

    let product = new Product({
      name,
      description,
      richDescription,
      image: `${basePath}${fileName}`,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    });

    product = await product.save();

    if (!product) {
      return res.status(500).send("The product cannot be created...👎");
    } else {
      return res.status(200).send(product);
      console.log(product);
    }
  } catch (err) {
    console.error(err.message);
    console.log("Server Error...🦠");
  }
});

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product ID...");
  }

  const createdCategory = await Category.findById(req.body.category);
  if (!createdCategory) {
    return res.status(400).send("Invalid Category...👎");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).send("Invalid product...👎");
  }

  const file = req.file;
  let imagePath;

  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    imagePath = `${basePath}${fileName}`;
  } else {
    imagePath = product.image;
  }

  try {
    const {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    let updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      richDescription,
      image: imagePath,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    });

    updatedProduct = await updatedProduct.save();

    if (!updatedProduct) {
      return res.status(500).send("The product cannot be updated...👎");
    } else {
      return res.status(200).send(updatedProduct);
      console.log(updatedProduct);
    }
  } catch (err) {
    console.error(err.message);
    console.log("Server Error...🦠");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "The product cannot be deleted...👎",
      });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "The product have been deleted...👍" });
      console.log(product);
    }
  } catch (err) {
    console.error(err.message);
    console.log("Server Error...🦠");
  }
});

router.get("/get/count", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (!productCount) {
      return res.status(500).json({ success: false });
    } else {
      return res.status(200).send({
        productCount,
      });
      console.log(productCount);
    }
  } catch (err) {
    console.error(err.message);
    console.log("Server Error...🦠");
  }
});

router.get("/get/featured/:count", async (req, res) => {
  try {
    const count = parseFloat(req.params.count)
      ? parseFloat(req.params.count)
      : 0;
    const products = await Product.find({ isFeatured: true }).limit(count);

    if (!products) {
      return res.status(500).json({ success: false });
    } else {
      return res.status(200).send(products);
    }
  } catch (err) {
    console.error(err.message);
    console.log("Server Error...🦠");
  }
});

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid product ID");
      }

      const files = req.files;
      let imagesPath = [];
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

      if (files) {
        files.map((file) => {
          imagesPath.push(`${basePath}${file.fileName}`);
        });
      }

      const product = await Product.findByIdAndUpdate(req.params.id, {
        images: imagesPath,
      });

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "The product cannot be updated...👎",
        });
      } else {
        return res.status(200).json({ success: true, result: product });
      }
    } catch (err) {
      console.error(err.message);
      console.log("Server Error...🦠");
    }
  }
);

module.exports = router;
