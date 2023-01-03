const express = require('express');
const router = express.Router();
const Categorie = require('../categories/Categorie')
const Article = require('./Article')
const Slugify = require('slugify');
const { default: slugify } = require('slugify');
const { application } = require('express');




router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Categorie}] /* Metodo join pra puxar os dados de outra tabela sql */
    })
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

router.post('/articles/delete', (req, res) => {

    var id = req.body.id

    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() =>{ 
                res.redirect('/admin/articles')
            });
        }else{ /* Se o id não for um numero */
            res.redirect('/admin/articles')
        }
    }else{ /* se o id for NULL */
        res.redirect('/admin/articles')
    }
})

router.get('/admin/articles/edit/:id', (req, res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect('/admin/articles')
    }
    
    Article.findByPk(id)
    .then(article => {
        if(article != undefined){
            Categorie.findAll().then(categories => {
                res.render('admin/articles/edit', {
                    article: article,
                    categories: categories
                })
            })
        }else{
            res.redirect('/admin/categories')
        }
    }).catch(err => {
        res.redirect('/admin/articles')
    })
})

router.post('/articles/update', (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var categoryId = req.body.categorie

    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    },{
        where: {
            id: id
        }
    })
    .then(() => {
        res.redirect('/admin/articles')
    })

})

router.get('/articles/page/:num', (req, res) => {
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4; 
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }) // vai retornar todos os artigos e a quantidade de artigos.
    .then(articles => {

        var next;
        if(offset + 4 >= articles.count){
            next = false;
        }else{
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles: articles,

        }

        Categorie.findAll().then(categories => {
            res.render('admin/articles/page', {
                categories: categories,
                result: result,
                page:page
            })
        })

    })

})

module.exports = router