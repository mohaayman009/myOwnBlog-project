require('dotenv').config()
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
    console.log('mongodb server started')
})

app.use(cors())
app.use(express.json());
app.use(cookieParser());


const postsRouter = require('./routes/posts.route');
const usersRouter = require('./routes/users.route');
const commentsRouter = require('./routes/comments.route');
const bodyParser = require('body-parser');


app.use('/api/posts', postsRouter) // /api/posts

app.use('/api/users', usersRouter) // /api/users
app.use('/api/comments', commentsRouter) // /api/users
// global middleware for not found router
app.all('*', (req, res, next)=> {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available'})
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})






app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
});
