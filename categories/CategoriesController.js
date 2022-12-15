const express = require('express');
const router = express.Router(); /* Criando o Router pois estou fora do arquivo principal*/

router.get('/categories', (req, res) => {
    res.send('ROTA DE CATEGORIAS')
});

router.get('/admin/categories/new', (req, res) => {
    res.send('ROTA PARA CRIAR UMA NOVA CATEGORIA')
})

module.exports = router