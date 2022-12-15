const Sequelize = require("sequelize");
const connection = require("../database/db");

const Categorie = connection.define("categories", {
  title:{
    type: Sequelize.STRING,
    allowNull: false,
  },slug:{
    type: Sequelize.STRING,
    allowNull: false
  }


});


module.exports = Categorie;