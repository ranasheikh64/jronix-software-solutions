const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getBlogs)
    // Use upload.single('image') to handle multipart form-data
    .post(upload.single('image'), createBlog);

router.route('/:id')
    .get(getBlogById)
    .put(upload.single('image'), updateBlog)
    .delete(deleteBlog);

module.exports = router;
