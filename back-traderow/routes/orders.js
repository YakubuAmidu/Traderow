const express = require('express');
const router = express.Router();

const { Order } = require('../models/order');
const { OrderItem } = require('../models/orderItem');

router.get('/', async (req, res) => {
    try {
        const orderList = await Order.find().populate('user').sort({'dateOrdered': -1});

        if(!orderList){
            return res.status(500).json({ success: false, message: 'The order cannot be found...👎'});
        } else {
            return res.status(200).send(orderList);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate('user')
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' }});

        if(!order){
            return res.status(404).json({ success: false, message: 'The order is not found...👎'})
        } else {
            return res.status(200).send(order);
        }
         
    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
})

router.post('/', async (req, res) => {
    try {
        const { 
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            totalPrice,
            user
        } = req.body;
             
        // Add Promise.all to req.body.orderItems
        const orderItemsIds = Promise.all(req.body.orderItems.map( async (orderItem) => {
            let newOrderItem = new OrderItem({
               quantity: orderItem.quantity,
               product: orderItem.product
            });
  
            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }))
        const orderItemsIdsResolved =  await orderItemsIds;
    
        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice
        }))
        
        // Correction totalPrice
       const total = totalPrices.reduce((a,b) => a + b , 0);

       console.log(totalPrices);

        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            totalPrice: total,
            user
        });

       order = await order.save();

       if(order){
           return res.status(200).json({ success: true, message: 'The order have been created...👍'});
       } else {
           return res.status(500).json({ success: false, message: 'The order cannot be created...👎'});
       }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.put('/:id', async (req, res) => {
    try {
        let order = await Order.findByIdAndUpdate(req.params.id, {
            status: req.body.status
        });

        order = order.save();

        if(order){
            return res.status(200).json({ success: true, message: 'The order have been updated...👍'});
        } else {
            return res.status(500).json({ success: false, message: 'The order cannot be updated...👍'});
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);

        if(order){
            await order.orderItems.map(async orderItem => {
             await OrderItem.findByIdAndDelete(orderItem).then(() => {
               return res.status(404).json({ success: false, message: 'The order Item is not found...👎'});
             }).catch((err) => {
                 console.error(err.message);
                 console.log('Server Error...🦠');
             })

            });
            return res.status(200).json({ success: true, message: 'The order have been deleted...👎'});
        } else {
            return res.status(404).json({ success: false, message: 'The order is not found...👎'});
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.get('/get/totalSales', async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
           { $group: { _id: null, totalSales: { $sum: '$totalPrice' }}}
        ]);

        if(!totalSales){
            return res.status(400).send('The total Sales cannot be generated...👎');
        } else {
            return res.status(200).send({ totalSales: totalSales.pop().totalSales });
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.get('/get/count', async (req, res) => {
    try {
      const orderCount = await Order.countDocuments();

      if(!orderCount){
          return res.status(400).json({ success: false, message: 'The is no order...👎'});
      } else {
          res.status(200).json({ success: true, result: orderCount });
      }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.get('/get/userorders/:userid', async (req, res) => {
    try {
        const userOrderList = await Order.find({ user: req.params.userid})
        .populate({
            path: 'orderItems', 
            populate: { path: 'product', populate: 'categopry' }
        }).sort({ 'dateOrdered': -1 });

        if(!userOrderList){
            return res.status(500).json({ success: false, message: 'No order for user...👎'});
        } else {
            return res.status(200).json({ success: true, result: userOrderList });
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
})

module.exports = router;