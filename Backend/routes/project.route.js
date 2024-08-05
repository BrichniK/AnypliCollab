const express= require ('express');
const router=express.Router();
const projectcontroller=require ("../controllers/project.controller");
const authJwt = require ("../middlewares/authJwt")


router.post('/addproject', [authJwt.verifyToken, authJwt.isManager], projectcontroller.add);
router.get('/showproject',[authJwt.verifyToken, authJwt.isManagerOrCollab], projectcontroller.show);
router.delete('/deleteproject/:id',[authJwt.verifyToken,authJwt.isAdminOrManager], projectcontroller.dlete);

module.exports=router;