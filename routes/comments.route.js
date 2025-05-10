const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comments.controller');

const { validationSchema } = require('../middleware/validationSchema');
const verifyToken = require('../middleware/verfiyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');
const appError = require('../utils/appError');


router.route('/:postId')
            .get(verifyToken,CommentController.getCommentsByPostId)
            .post(verifyToken, CommentController.createComment);
router.route('/:commentId')
            .patch(verifyToken,  CommentController.updateComment)
            .delete(verifyToken,  CommentController.deleteComment);



module.exports = router;