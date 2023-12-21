const express = require('express')
const router = express.Router();
const cookieJwtAuth = require('../middlewares/auth-jwt');
const UserController = require('../controllers/UserController');
const calendar = require("../public/scripts/calendar-config");

// Les différentes routes pour localhost:3000/users/

router.post('/signup', async (req, res) => {UserController.signUp(req, res)});

router.get('/login', (req, res) => res.render('pages/login'));

router.post('/login', async (req, res) => {UserController.login(req, res)});

router.get('/home', cookieJwtAuth, (req, res) => {UserController.getInfos(req, res, 'home')}); 

router.get('/settings', cookieJwtAuth, (req, res) => {UserController.getInfos(req, res, 'settings')});

router.post('/avatar', (req, res) => {UserController.changeAvatar(req, res)});

router.get('/logout', (req, res) => {UserController.logout(req, res)});

module.exports = router;