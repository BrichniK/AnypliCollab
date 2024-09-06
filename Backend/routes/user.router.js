const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');


router.get('/show',userController.show);
router.get('/showById/:id',userController.showById);
router.put('/edit-profile/:userid', userController.update);
router.delete('/delete/:userid', userController.deleteUser);
router.get('/dashboard/total-users', userController.getUserCount);

module.exports = router;