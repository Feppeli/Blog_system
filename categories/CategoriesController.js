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
        res.redirect('/admin/categories')
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

router.post('/categories/delete', (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)) { /* Verificando se o id é um número */
            Categorie.destroy({
                where: {
                    id:id
                }
            })
            .then(() => {
                res.redirect('/admin/categories')
                    
                });
        }else{ /* se não for um numero */
            res.redirect('/admin/categories')
        }
    }else{ /* se for null */
        res.redirect('/admin/categories')
    };
});


router.get('/admin/categories/edit/:id', (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect('/admin/categories')
    }
    Categorie.findByPk(id)
    .then(categorie => {
        if(categorie != undefined){

            res.render('admin/categories/edit', {
                categorie: categorie
            })

        }else{
            res.redirect('/admin/categories')
        }
    }).catch(err => {
        res.redirect('/admin/categories')
    })
})

router.post('/categories/update', (req,res) => {
    var id = req.body.id;
    var title = req.body.title;


    Categorie.update({
        title: title,
        slug: slugify(title)
    },{
        where: {
            id: id
        }
    })
    .then(()=> {
        res.redirect('/admin/categories')
    })
})

module.exports = router