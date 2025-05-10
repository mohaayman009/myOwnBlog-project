
const {validationResult} = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');
const Post = require('../models/post.model');
const { cloudinary } = require('../utils/cloudinary');

const getAllPosts = asyncWrapper(async (req,res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // get all Posts) from DB using Post Model
    const Posts = await Post.find({}, {"__v": false}).limit(limit).skip(skip);

    res.json({ status: httpStatusText.SUCCESS, data: {Posts}});
})

const getPost = asyncWrapper(
    async (req, res, next) => {

        const Post = await Post.findById(req.params.PostId);
        if(!Post) {
            const error = appError.create('Post not found', 404, httpStatusText.FAIL)
            return next(error);
        }
        return res.json({ status: httpStatusText.SUCCESS, data: {Post}});
    
    }
)

const addPost = asyncWrapper(async (req, res, next) => {


    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = appError.create(errors.array(), 400, httpStatusText.FAIL)
        return next(error);
    }
    
    const { title, content, tags } = req.body;
    const imageUrl = req.file.path; // Cloudinary 
    

    const newPost = new Post({
        title,
        content,
        author: req.currentUser.id,
        tags,
        imageUrl,
    });

    
    await newPost.save();

    res.status(201).json({status: httpStatusText.SUCCESS, data: {Post: newPost}})
})

const updatePost = asyncWrapper(async (req, res) => {
    const PostId = req.params.PostId;    
    const updatedPost = await Post.updateOne({_id: PostId}, {$set: {...req.body}});
    return res.status(200).json({status: httpStatusText.SUCCESS, data: {Post: updatedPost}})


})

const deletePost = asyncWrapper(async (req, res) => {
    await Post.deleteOne({_id: req.params.PostId});
    res.status(200).json({status: httpStatusText.SUCCESS, data: null});
})

module.exports = {
    getAllPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}
