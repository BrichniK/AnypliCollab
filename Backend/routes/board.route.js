const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');

router.post('/addboard',[verifyToken,authJwt.isAdminOrManager], boardController.add);
router.get('/show', boardController.show);
router.get('/showById/:boardid', boardController.showById);
router.delete('/delete/:boardid', [verifyToken,authJwt.isAdminOrManager],boardController.delete);
router.put('/update/:id', [verifyToken,authJwt.isAdminOrManager],boardController.updateBoard);
router.post('/:boardid/addTask', [verifyToken,authJwt.isAdminOrManager],boardController.addTask);
router.get('/tasks/:boardid', boardController.getTasksByBoardId);
router.get('/dashboard/total-boards', boardController.getBoardCount);

module.exports = router;
