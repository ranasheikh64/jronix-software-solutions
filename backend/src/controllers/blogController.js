const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a blog (Handles multipart/form-data with image)
// @route   POST /api/blogs
const createBlog = async (req, res) => {
    try {
        const blogData = { ...req.body };
        
        // If an image was uploaded via Multer/Cloudinary, use its URL
        if (req.file) {
            blogData.image = req.file.path;
        }

        const blog = new Blog(blogData);
        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog (Handles multipart/form-data with image)
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (blog) {
            blog.category = req.body.category || blog.category;
            blog.title = req.body.title || blog.title;
            blog.description = req.body.description || blog.description;
            blog.authorName = req.body.authorName || blog.authorName;
            blog.authorImage = req.body.authorImage || blog.authorImage;
            blog.readTime = req.body.readTime || blog.readTime;
            
            // If a new image was uploaded, update the URL
            if (req.file) {
                blog.image = req.file.path;
            } else if (req.body.image) {
                // Fallback for direct URL update
                blog.image = req.body.image;
            }
            
            const updatedBlog = await blog.save();
            res.status(200).json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (blog) {
            await Blog.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
