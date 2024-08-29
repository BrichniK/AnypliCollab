const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');

router.post('/add', [verifyToken,authJwt.isAdmin],taskController.add);
router.get('/show', [verifyToken],taskController.show);
router.get('/showById/:taskid', taskController.showById);
router.put('/update/:taskid',[verifyToken,authJwt.isManagerOrCollab], taskController.update);
router.delete('/delete/:taskid',[verifyToken,authJwt.isAdminOrManager], taskController.delete);
router.get('/dashboard/total-tasks', taskController.getTasksCount);
router.get('/status-count', taskController.countTasksByStatus);
router.get('/priority-count', taskController.countTasksByPriority);

module.exports = router;
