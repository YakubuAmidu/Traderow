const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorhandler = require('./helpers/error-handler');

require('dotenv/config');

const app = express();
const api = process.env.API_URL;
const Database = process.env.DATABASE_STRING;

// Port
const port = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors);

// Middleware
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(express.json({ extended: false }));
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorhandler);

const productsRoute = require('./routes/products');
const categoriesRoute = require('./routes/categories');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');

// Routes
app.use(`${api}/products`, productsRoute);
app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/users`, usersRoute);
app.use(`${api}/orders`, ordersRoute);

// Database connection
mongoose.connect(Database).then(() => {
    console.log('Database connected successfully...👍');
}).catch(err => {
    console.error(err.message);
    console.log('Server Error🦠');
});

// Server
app.listen(port, (req, res) => {
    console.log(api);
    console.log(`Server start on port ${port}`);
});


