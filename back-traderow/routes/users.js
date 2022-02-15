const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { User } = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const userList = await User.find().select('-passwordHash');

        if(!userList){
            return res.status(400).json({ success: false });
        } else {
            return res.status(200).send(userList);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
    res.send('User route');
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');

        if(!user){
            return res.status(400).json({ success: false, message: 'The user cannot be found...👎' });
        } else {
            return res.status(200).send(user);
            console.log(user);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, isAdmin, street, apartment, zip, city, country } = req.body;

        let user = new User({
            name,
            email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        });

        user = await user.save();

        if(!user){
            return res.status(400).json({ success: false, message: 'The user cannot be registered...👎'});
        } else {
            return res.status(200).send(user);
            console.log(user);
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        const secret = process.env.secret;

        if(!user){
            return res.status(400).json({ success: false, message: 'The user cannot be found...👎'});
        } else if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
            {
              userId: user.id,
              isAdmin: user.isAdmin
            }, 
              secret,
              {
                  expiresIn: '1w'
              }
            );

            return res.status(200).send({ user: user.email, token: token });
        } else {
            return res.status(400).send('Password is wrong...👎');
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, passwordHash, phone, isAdmin, street, apartment, zip, city, country } = req.body;

        let user = new User({
            name,
            email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        });

        user = await user.save();

        if(!user){
            return res.status(400).send('The user cannot be registered...👎');
        } else {
            return res.send(user);
            console.log(user);
        }

    } catch (err){
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        
        if(!user){
            return res.status(500).json({ success: false, message: 'The user is not found...👎'});
        } else {
            return res.status(200).json({ success: true, message: 'The user have been deleted...👍'});
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

router.get('/get/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();

        if(!userCount){
            return res.status(500).json({ success: false });
        } else {
            return res.status(200).send({
                userCount: userCount
            });
        }

    } catch (err) {
        console.error(err.message);
        console.log('Server Error...🦠');
    }
});

module.exports = router;