const Sequelize = require('sequelize');
const connection = require('../database/db');
const Categorie = require('../categories/Categorie');

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
        
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Criando um relacionamento entre os artigos e a categoria

Categorie.hasMany(Article) /* Nesse metodo estou dizendo que varios articles podem entrar 
na categorie  RELACIONAMENTO 1pM */


Article.belongsTo(Categorie) /* Nesse metodo estou dizendo que cada artigo está
relacionado a uma categoria  RELACIONAMENTO 1p1*/

/* Article.sync({force: true}) */


module.exports = Article;