const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.post('/signup', authController.signup);
router.post('/signin', authController.login);
router.post("/signout", authController.signout);
module.exports = router;
