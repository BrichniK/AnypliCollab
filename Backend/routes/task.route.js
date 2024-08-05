const express = require('express');
const router = express.Router();
const taskcontroller = require('../controllers/tasks.controller');
const authJwt = require('../middlewares/authJwt'); 


router.post('/addtask', [authJwt.verifyToken, authJwt.isManager], taskcontroller.add);
router.get('/showtask', [authJwt.verifyToken,authJwt.isManagerOrCollab], taskcontroller.show);
router.delete('/deletetask/:id', [authJwt.verifyToken,authJwt.isManager], taskcontroller.dlete);
router.put('/updatetask/:id', [authJwt.verifyToken,authJwt.isManager], taskcontroller.update);
router.put('/updatestatus/:id', [authJwt.verifyToken,authJwt.isManagerOrCollab], taskcontroller.updateTaskStatus);

module.exports = router;
