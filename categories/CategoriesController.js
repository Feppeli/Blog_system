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
        title: req.body.title,
        slug: slugify(title)
    })
    .then(()=> {
        res.redirect('/')
    })
    }else{
        res.redirect('admin/categories/new')
    }
})

module.exports = router