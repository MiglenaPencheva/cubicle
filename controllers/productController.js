const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Browse', products });
        })
        .catch(() => res.status(500).end())
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getProductByIdWithAccessories(req.params.productId);
    res.render('details', { title: 'Product Details', product });
});

router.get('/:productId/attach', async (req, res) => {
    let product = await productService.getProductById(req.params.productId);
    let accessories = await accessoryService.getAllUnattached(product.accessories);
    res.render('attachAccessory', { product, accessories });
});

router.post('/:productId/attach', (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
});

module.exports = router;