const express= require ('express');
const router=express.Router();
const taskcontroller=require ("../controllers/tasks.controller");



router.post('/addtask',taskcontroller.add);
router.get('/showtask',taskcontroller.show);
router.delete('/deletetask/:id',taskcontroller.dlete);
router.put('/updatetask/:id',taskcontroller.update);
router.put('/updatestatus/:id',taskcontroller.update);

module.exports=router;