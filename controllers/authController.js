const router = require('express').Router();

const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const validator = require('validator');
const { check, validationResult } = require('express-validator');

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});



router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');

    } catch (error) {
        res.render('login', { error });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post(
    '/register',
    isGuest,
    // check('username', 'Username is required').notEmpty(),
    // check('password', 'Password too short').isLength({ min: 5 }),
    async (req, res) => {
        const { username, password, repeatPassword } = req.body;

        // let isStrongPassword = validator.isStrongPassword(password, { 
        //     minLength: 8, 
        //     minLowercase: 1, 
        //     minUppercase: 1, 
        //     minNumbers: 1, 
        //     minSymbols: 1, 
        // });

        try {
            // if (!isStrongPassword) {
            //     throw { message: 'Stronger password required', username: req.body.username };
            // }
            if (password !== repeatPassword) {
                throw { error: {message: 'Password missmatch!' }};
            }

            let user = await authService.register({ username, password });
            res.redirect('/auth/login');

        } catch (err) {
            // let error = Object.keys(err?.errors).map(x => ({message: err.errors[x].properties.message}))[0];
            let error = Object.keys(err?.errors).map(x => ({ message: err.errors[x].message}))[0];
            
            res.render('register', { error });
        }
    });

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products')
})

module.exports = router;