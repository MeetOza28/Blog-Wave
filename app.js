const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const {connectToDB}= require("./connection")

// express app
const app = express();

connectToDB("mongodb://127.0.0.1:27017/megathon")
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
    
// register view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // This sets the views directory path


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('/blogs');    
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
// app.use((req, res) => {
//     res.status(404).render('404', { title: '404' });
// });

