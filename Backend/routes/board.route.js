const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.post('/addboard', boardController.add);
router.get('/show', boardController.show);
router.get('/showById/boardid', boardController.showById);
router.put('/update/:boardid', boardController.update);
router.delete('/delete/:boardid', boardController.delete);

module.exports = router;
