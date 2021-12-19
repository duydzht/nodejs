const express = require('express');
const { check } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
    '/signup',
    check('email').isEmail().withMessage('Please Enter a valid email address.').custom((value, {req})=>{
        if(value === 'hoangduy241199@gmail.com'){
            throw new Error('This Email address if forbidden.')
        }
        return true;
    }),
    authController.postSignup
);

router.post('/logout', authController.postLogout);

module.exports = router;
