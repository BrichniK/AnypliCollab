const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamation.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');


router.post('/addreclamation',[verifyToken,authJwt.isManagerOrCollab], reclamationController.addreclamation);
router.get('/show', [verifyToken,authJwt.isAdmin],reclamationController.show);
router.get('/showById/:reclamationid', reclamationController.showById);
router.delete('/delete/:reclamationid',[verifyToken,authJwt.isAdmin], reclamationController.delete);
router.put('/update/:id', [verifyToken,authJwt.isManagerOrCollab],reclamationController.update);
router.get('/dashboard/total-reclas', reclamationController.getReclaCount);

module.exports = router;
