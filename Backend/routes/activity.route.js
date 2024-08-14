const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');


router.post('/addactivity', activityController.add);
router.get('/show', activityController.show);
router.get('/showById/:id', activityController.showById);
router.put('/update/:activityid', activityController.update);
router.delete('/delete/:activityid', activityController.delete);
module.exports = router;