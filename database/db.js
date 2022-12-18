const Sequelize = require('sequelize');

const connection = new Sequelize('Blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00' /* timezone do Brasil */
});

module.exports = connection;