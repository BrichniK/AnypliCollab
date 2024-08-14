const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');



router.get('/show', userController.show);
router.get('/showById/:id', userController.showById);
router.put('/update/:userid', userController.update);
router.delete('/delete/:userid', userController.deleteUser);

module.exports = router;