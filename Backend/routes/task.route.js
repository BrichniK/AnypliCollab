const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');


router.post('/addtask', taskController.add);
router.get('/show', taskController.show);
router.get('/showById/:id', taskController.showById);
router.put('/update/:taskid', taskController.update);
router.delete('/delete/:taskid', taskController.delete);
module.exports = router;