const { Router } = require('express');
const { getAll, create } = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    let products = getAll();
    res.render('home', { title: 'Browse', products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', (req, res) => {
    create(req.body);
    res.redirect('/products');
});

router.get('/details/:productId', (req, res) => {
    res.render('details', { title: 'Product details' });
});



module.exports = router;