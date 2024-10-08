const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ROLES = ["ADMIN", "MANAGER", "COLLAB"]; 


checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
   
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUserByEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

   
    const existingUserByName = await prisma.user.findUnique({
      where: { name: req.body.name },
    });

    if (existingUserByName) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
