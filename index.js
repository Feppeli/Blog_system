const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");
const session = require('express-session');

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const userControler = require("./user/UserController")

const Article = require("./articles/Article");
const Categorie = require("./categories/Categorie");
const User = require("./user/User")


// View engine
app.set('view engine','ejs');

//session

//redis
/* Em projetos de média e longa escala deve ser utilizado o Redis para não 
estourar o limite de memória da máquina ou servidor */


app.use(session({
    secret: "Ssdsd@#e$#Rfe@#$d#$#",
    cookie: {
        maxAge: 10800000
    }
}))


// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })


app.use("/",categoriesController);    
app.use("/",articlesController);
app.use("/",userControler);


// manipulando as sessões
app.get('session', (req, res) => {
    
})

app.get('/leitura', (req, res) => {

})


app.get("/", (req, res) => {

    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit: 4
    }).then(article => {
       Categorie.findAll().then(categories => {
        res.render("index", {
            articles: article,
            categories: categories
        });
       })
    })


})

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Categorie.findAll().then(categories => {
                res.render('article', {
                    article: article,
                    categories: categories
                })
            })
/*             res.render('article',{
                article: article
            }) */
        }else{
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})


// NÃO MEXER PELO AMOR DE DEUS!!!!!!
app.get('/categorie/:slug', (req, res) => {
    var slug = req.params.slug;
    Categorie.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( categorie => {
        if(categorie != undefined){
            Categorie.findAll().then(categories => {
                res.render('index', {articles: categorie.articles, categories: categories})
            })
        }else{
            res.redirect('/')
        }
    })
    .catch(err => {
        res.redirect('/')
    })
})


app.listen(8080, () => {
    console.log("O servidor está rodando!")
})