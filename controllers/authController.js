const router = require('express').Router();
const authService = require('../services/authService');


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
        res.end();

    } catch (error) {
        console.log(error);
    }
});

router.post('/register' , async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    
    try {
        if (password !== repeatPassword) {
            return res.render('register', { error: { message: 'Password missmatch!' }}); 
        }
        let user = await authService.register({ username, password });
        res.redirect('/');

    } catch (error) {
        res.render('register', {error});
    }
});


module.exports = router;