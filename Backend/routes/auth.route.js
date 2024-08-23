const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Use the correct path for the signup function
router.post('/signup', authController.signup);
router.post('/signin', authController.login);

module.exports = router;
