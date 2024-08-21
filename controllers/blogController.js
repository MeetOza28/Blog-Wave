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

const blog_details = (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog: result, title: 'Blog Details'});
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { edit: false, title: 'Create Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        })
}

const blog_edit_get = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).render('404', { title: 'Blog not found' });
            }
            res.render('blogs/create', { edit: true, blog, title: 'Edit Blog' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Server error', error: err.message });
        });
};

const blog_edit_post = (req, res) => {
    const updatedBlogData = {
        id: req.body.id,
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    };

    Blog.findByIdAndUpdate(req.body.id, updatedBlogData, { new: true })
        .then(updatedBlog => {
            if (!updatedBlog) {
                return res.status(404).send('Blog not found');
            }
            console.log('Blog updated successfully');
            res.redirect('/blogs');
        })
        .catch(err => {
            console.error('Error updating blog:', err);
            res.status(500).send('Internal Server Error');
        });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_post
}