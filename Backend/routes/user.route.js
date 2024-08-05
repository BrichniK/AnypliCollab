const authJwt = require ("../middlewares/authJwt")
const controller = require("../controllers/user.controller")


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
       "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/user/current", [authJwt.verifyToken],controller.getCurrentUser);
  
  app.get("/test/all", );

  app.get("/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/manager",
    [authJwt.verifyToken, authJwt.isCollab],
    controller.managerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  



};
