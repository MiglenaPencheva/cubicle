const { Router } = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
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

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', isAuthenticated, (req, res) => {
    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getProductByIdWithAccessories(req.params.productId);
    res.render('details', { title: 'Product Details', product });
});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    let product = await productService.getProductById(req.params.productId);
    let accessories = await accessoryService.getAllUnattached(product.accessories);
    res.render('attachAccessory', { product, accessories });
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getProductById(req.params.productId)
        .then(product => {
            res.render('editCube', product);
        });
});

router.post('/:productId/edit', isAuthenticated, (req, res) => {
    productService.updateById(req.params.productId, req.body)
        .then(updated => {
            res.redirect(`/products/details/${req.params.productId}`);
        });
});

router.get('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getProductById(req.params.productId)
        .then(product => {
            if (req.user._id != product.creator) {
                res.redirect('/products');
            } else {
                res.render('deleteCube', product);
            }
        });
});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getProductById(req.params.productId)
        .then(product => {
            if (product._id !== req.user._id) {
                return res.redirect('/products');
            }
            // res.render('deleteCube', product);
            return productService.deleteById(req.params.productId)
        })
        .then(deleted => res.redirect('/products'));
});



module.exports = router;