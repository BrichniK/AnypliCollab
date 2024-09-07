const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const { verifyToken } = require('../middlewares/authJwt'); 
const authJwt = require('../middlewares/authJwt');

router.post('/addboard',boardController.addBoard);
router.get('/show', boardController.show);
router.get('/showById/:boardid', boardController.showById);
router.get('/wallpaper/:boardid', boardController.getURL);
router.delete('/delete/:boardid',boardController.delete);
router.put('/update/:id', boardController.updateBoard);
router.post('/:boardid/addTask',boardController.addTask);
router.get('/tasks/:boardid', boardController.getTasksByBoardId);
router.get('/dashboard/total-boards', boardController.getBoardsCount);
router.get('/user-boards/:userId', boardController.showBoardsByUserId);
module.exports = router;
