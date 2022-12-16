const express = require('express');
const Categorie = require('./Categorie');
const router = express.Router(); /* Criando o Router pois estou fora do arquivo principal*/
const slugify = require('slugify');


router.get("/admin/categories/new", (req, res) => {
    res.render('admin/categories/new')
});

router.post("/categories/save", (req,res) => {
    var title = req.body.title;
    if(title != undefined){
        
    Categorie.create({
        title: title,
        slug: slugify(title)
    })
    .then(()=> {
        res.redirect('/')
    })
    }else{
        res.redirect('admin/categories/new')
    }
});

router.get('/admin/categories', (req, res) => {

    Categorie.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories: categories
        });
    });
});


module.exports = router