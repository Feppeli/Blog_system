const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Categorie = require("./categories/Categorie");

// View engine
app.set('view engine','ejs');

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

app.get("/", (req, res) => {

    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
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

app.get('/categorie/:slug', (req, res) => {
    var slug = req.params.slug
    Categorie.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(categorie => {
        if(categorie != undefined){
            Categorie.findAll().then(categorie => {
                res.render('index', {articles: categorie.articles, categories: categorie})
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