const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.post('/addboard', boardController.add);
router.get('/show', boardController.show);
router.get('/showById/:boardid', boardController.showById);
router.delete('/delete/:boardid', boardController.delete);
router.put('/update/:id', boardController.updateBoard);
router.post('/:boardid/addTask', boardController.addTask);
module.exports = router;
