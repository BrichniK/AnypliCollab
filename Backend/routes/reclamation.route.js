const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamation.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');


router.post('/addreclamation',reclamationController.addReclamation);
router.get('/show', reclamationController.show);
router.get('/showById/:reclamationid', reclamationController.showById);
router.delete('/delete/:reclamationid', reclamationController.delete);
router.put('/update/:id', reclamationController.update);
router.get('/dashboard/total-reclas', reclamationController.getReclaCount);
router.get('/user-reclas/:userId', reclamationController.showByuserId);
router.put('/updates/:id', reclamationController.updatestatus);
router.get('/recla-count', reclamationController.countRecla);
module.exports = router;
