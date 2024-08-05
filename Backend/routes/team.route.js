const express= require ('express');
const router=express.Router();
const teamcontroller=require ("../controllers/team.controller");
const authJwt = require ("../middlewares/authJwt")


router.post('/addteam',[authJwt.verifyToken,authJwt.isManager], teamcontroller.add);
router.get('/showteam',[authJwt.verifyToken,authJwt.isManagerOrCollab], teamcontroller.show);
router.delete('/deleteteam/:id',[authJwt.verifyToken,authJwt.isManager], teamcontroller.dlete);

module.exports=router;