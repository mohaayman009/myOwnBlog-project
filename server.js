require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpStatusText');
cookieParser = require('cookie-parser');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log('mongodb server started');
})

app.use(cors())
app.use(express.json());
app.use(cookieParser());




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));




const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const cartsRouter = require('./routes/carts');
const paymentRouter = require('./routes/payment');


app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/payment', paymentRouter);





// Then 404 handler (LAST MIDDLEWARE)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found'
  });
});

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})



app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
});
