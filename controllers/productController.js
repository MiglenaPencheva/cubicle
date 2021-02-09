const { Router } = require('express');
const { getAll, create, getCubeById } = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    let products = getAll(req.query);
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
    let product = getCubeById(req.params.productId);
    res.render('details', { title: 'Product details', product });
});



module.exports = router;