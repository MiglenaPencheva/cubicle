const { Router } = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const accessoryService = require('../services/accessoryService');

const router = Router();


router.get('/create', isAuthenticated, (req, res) => {
    res.render('createAccessory');
});


// TODO: create validation middleware!

router.post('/create', isAuthenticated, (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});

module.exports = router;