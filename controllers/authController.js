const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');

    } catch (error) {
        res.render('login', { error });
    }
});

router.post('/register' , async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    
    try {
        if (password !== repeatPassword) {
            return res.render('register', { error: { message: 'Password missmatch!' }}); 
        }
        let user = await authService.register({ username, password });
        res.redirect('/auth/login');

    } catch (error) {
        res.render('register', {error});
    }
});


module.exports = router;