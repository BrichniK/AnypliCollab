const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');


router.get('/show',[verifyToken,authJwt.isAdmin], userController.show);
router.get('/showById/:id', [verifyToken,authJwt.isAdmin],userController.showById);
router.put('/update/:userid',[verifyToken,authJwt.isAdmin], userController.update);
router.delete('/delete/:userid', [verifyToken,authJwt.isAdmin],userController.deleteUser);

module.exports = router;