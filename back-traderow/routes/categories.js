const express = require('express');
const router = express.Router();

const { Category } = require('../models/category');

router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();

        if(!categoryList){
            return res.status(500).json({ success: false });
        } else {
            return res.status(200).send(categoryList);
            console.log(categoryList);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if(!category){
            return res.status(500).json({ success: false, message: 'The category with the given ID was not found...🚫'});
        } else {
            return res.status(200).send(category);
            console.log(category);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, icon, color } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, {
          name,
          icon,
          color
        });

        if(category){
            return res.status(200).json({ success: true, message: 'The category have been updated...👍' });
        } else {
            return res.status(400).json({ success: false, message: 'The category cannot be created...👎' });
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }

});

router.post('/', async (req, res) => {
    try {
        const { name, icon, image } = req.body;

        let category = new Category({
            name,
            icon,
            image
        });

        category = await category.save();

        if(!category){
            return res.status(400).send('The category cannot be created...👎');
        } else {
            return res.status(200).send(category);
            console.log(category);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);

        if(!category){
            return res.status(404).json({ success: false, message: 'The category cannot be deleted...👎'});
        } else {
            return res.status(200).json({ success: true, message: 'Category has been deleted...👍'});
            console.log(category);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
})

module.exports = router;