const Post = require('../models/post.model');  
const Comment = require('../models/comment.model');
const {validationResult} = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

// Get all comments for a specific blog post
exports.getCommentsByPostId = asyncWrapper(async (req, res) => {
    
        const { postId } = req.params;
        const post = postId;
        const comments = await Comment.find({ post });
        res.status(200).json(comments);

});

// Create a new comment for a blog post
exports.createComment = asyncWrapper(async (req, res) => {

        const { postId } = req.params;
        const { text } = req.body;
 
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required'
             });
        }
        const newComment = new Comment({
            text,
            post: postId,
            user: req.currentUser.id,
            createdAt: new Date()
        });
      
        await newComment.save();

       const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments:newComment._id} }, { new: true }).populate('comments');
       if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }
       res.status(201).json({ status: httpStatusText.SUCCESS, updatedPost });

});

// Update a comment
exports.updateComment = asyncWrapper(async (req, res) => {
    
        const { commentId } = req.params;
        const { text } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { text },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ status: httpStatusText.SUCCESS, updatedComment });

});

// Delete a comment
exports.deleteComment = asyncWrapper(async (req, res) => {
    
            
            const { commentId } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    
});