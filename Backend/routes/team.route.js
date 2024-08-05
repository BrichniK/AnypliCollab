const express= require ('express');
const router=express.Router();
const teamcontroller=require ("../controllers/team.controller");



router.post('/addteam',teamcontroller.add);
router.get('/showteam',teamcontroller.show);
router.delete('/deleteteam/:id',teamcontroller.dlete);

module.exports=router;