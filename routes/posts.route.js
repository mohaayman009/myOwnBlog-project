
const express = require('express');
const router = express.Router();

const PostController = require('../controllers/posts.controller');

const { validationSchema } = require('../middleware/validationSchema');
const verifyToken = require('../middleware/verfiyToken');
const userRoles = require('../utils/userRoles');



router.route('/')
            .get(verifyToken,PostController.getAllPosts)
            .post(verifyToken, upload.single('image'),validationSchema(),PostController.addPost);


router.route('/:PostId')
            .get(verifyToken,PostController.getPost)
            .patch(verifyToken,PostController.updatePost)
            .delete(verifyToken,  PostController.deletePost);


module.exports = router;