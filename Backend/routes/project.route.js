const express= require ('express');
const router=express.Router();
const projectcontroller=require ("../controllers/project.controller");



router.post('/addproject',projectcontroller.add);
router.get('/showproject',projectcontroller.show);
router.delete('/deleteproject/:id',projectcontroller.dlete);

module.exports=router;