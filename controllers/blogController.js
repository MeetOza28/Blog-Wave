const Blog = require('../models/blog');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete, blog_edit

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
}