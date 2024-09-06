const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');

router.post('/add', taskController.add);
router.get('/show', taskController.show);
router.get('/showById/:taskid', taskController.showById);
router.put('/update/:taskid',taskController.update);
router.delete('/delete/:taskid', taskController.delete);
router.get('/dashboard/total-tasks', taskController.getTasksCount);
router.get('/status-count', taskController.countTasksByStatus);
router.get('/priority-count', taskController.countTasksByPriority);
router.get('/user-tasks/:userId', taskController.showByuserId);

module.exports = router;
