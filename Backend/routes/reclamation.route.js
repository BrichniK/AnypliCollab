const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamation.controller');

router.post('/addreclamation', reclamationController.addreclamation);
router.get('/show', reclamationController.show);
router.get('/showById/:reclamationid', reclamationController.showById);
router.delete('/delete/:reclamationid', reclamationController.delete);
router.put('/update/:id', reclamationController.update);

module.exports = router;
