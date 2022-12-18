const express = require('express');
const router = express.Router();
const Categorie = require('../categories/Categorie')
const Article = require('./Article')
const Slugify = require('slugify');
const { default: slugify } = require('slugify');

router.get('/admin/articles', (req, res) => {
    Article.findAll()
    .then(articles => {
        res.render('admin/articles/index',{
            articles: articles
        })
    })
});

router.get('/admin/articles/new', (req, res) =>{
    Categorie.findAll()
    .then(categories => {
        res.render('admin/articles/new', {
            categories: categories
        })
    })

})

router.post('/articles/save', (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var categorie = req.body.categorie

    Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId : categorie
    })
    .then(()=> {
        res.redirect('/admin/articles')
    })
})

module.exports = router