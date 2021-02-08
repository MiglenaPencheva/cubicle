const { Router } = require('express');

const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');

const router = Router();



router.use('/', homeController);
router.use('/products', productController);
router.get('*', (req, res) => {
    res.render('404');
});



module.exports = router;