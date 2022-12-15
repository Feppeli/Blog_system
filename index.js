const bodyParser = require("body-parser");
const express = require("express");
const connection = require("./database/db");
const app = express();

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")


// Conexão com o DATABASE
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com DB estabelecida com sucesso!");
  })
  .catch((err) => {
    console.log(`Ocorreu algum erro na conexão com o DB: ${err}`);
  });




  app.use('/', categoriesController);
  app.use('/', articlesController)

// CONFIGURAÇÃO DO EJS
app.set("view engine", "ejs");
app.use(
  express.static("public")
); /* Metodo que prevê utilização de js, css e arquivos do fronte pelo express */



// CONFIGURANDO O BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;





// ROTAS
app.get("/", (req, res) => {
  res.render("index");
});

// Abertura do servidor local
app.listen(port, (err) => {
  console.log(`Servidor rodando na porta: http://localhost/${port}`);
  if (err) {
    console.log(`Ocorreu algum erro: ${err}`);
  }
});
