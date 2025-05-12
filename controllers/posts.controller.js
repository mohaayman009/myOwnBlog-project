
const {validationResult} = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');
const Post = require('../models/post.model');
const { cloudinary } = require('../utils/cloudinary');
const { search } = require('../routes/users.route');

const getAllPosts = asyncWrapper(async (req,res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // get all Posts) from DB using Post Model
    const Posts = await Post.find({}, {"__v": false}).limit(limit).skip(skip);

    res.json({ status: httpStatusText.SUCCESS, data: {Posts}});
})

const searchForPosts = asyncWrapper(async (req, res) => {
  
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    const  searchTerm  = req.query.searchTerm

    console.log('searching for posts',searchTerm);

    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const Posts = await Post.find({
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { content: { $regex: searchTerm, $options: 'i' } },
            { tags: { $regex: searchTerm, $options: 'i' } }
        ]
    },{"__v": false}).limit(limit).skip(skip);

    res.json({ status: httpStatusText.SUCCESS, data: { Posts } });
});



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
    const imageId = req.file.filename; 
    

    const newPost = new Post({
        title,
        content,
        author: req.currentUser.id,
        tags,
        imageUrl,
        imageId,
    });

  
    await newPost.save();

    res.status(201).json({status: httpStatusText.SUCCESS, data: {Post: newPost}})
})

const updatePost = asyncWrapper(async (req, res) => {
    const { PostId } = req.params;
    const post = await Post.findById({_id: PostId});
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // If a new image is uploaded
    if (req.file) {
      // 1. Delete the old image from Cloudinary (if exists)
      if (post.imageId) {
        await cloudinary.uploader.destroy(post.imageId);
      }

      // 2. Update with new image details
      post.imageUrl = req.file.path; // Cloudinary URL
      post.imageId = req.file.filename; // Cloudinary public_id
    }
     if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
     if (req.body.tags) post.tags = req.body.tags;
    
    // Save the updated post
    await post.save();
    
    return res.status(200).json({status: httpStatusText.SUCCESS, data: {Post: post}})


})

const deletePost = asyncWrapper(async (req, res) => {
      const post = await Post.findByIdAndDelete(req.params.PostId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete image from Cloudinary if exists
    if (post.imageId) {
      await cloudinary.uploader.destroy(post.imageId);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, message:'Post deleted successfully', data: null});
   
})

module.exports = {
    getAllPosts,
    searchForPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}
