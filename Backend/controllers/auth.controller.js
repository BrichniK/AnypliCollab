const config = require("../config/auth.config");
const User = require ("../models/user.model");
const Role = require ("../models/role.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");





exports.signup = async (req, res) => {
  try {

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    let roles;
    
    
    if (req.body.roles) {
      if (typeof req.body.roles === 'string') {
       
        roles = await Role.find({ name: req.body.roles }).exec();
      } else if (Array.isArray(req.body.roles)) {
       
        roles = await Role.find({ name: { $in: req.body.roles } }).exec();
      } else {
        return res.status(400).send({ message: "Invalid roles format." });
      }

      
      console.log("Fetched roles:", roles);

    
      if (roles.length === 0) {
        return res.status(400).send({ message: "No valid roles found." });
      }
    } else {
      return res.status(400).send({ message: "Roles must be provided." });
    }

   
    user.roles = roles.map(role => role._id);
    
   
    await user.save();

   
    res.send({ message: "User was registered successfully!" });

  } catch (err) {
   
    res.status(500).send({ message: err.message });
  }
};



exports.signin = async (req, res) => {
  try {
   
    const user = await User.findOne({ email: req.body.email })
      .populate("roles", "-__v")
      .exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

 
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
     
      user.loginAttempts += 1;

      if (user.loginAttempts >= 3) {
       
        user.lockUntil = Date.now() + 60 * 60 * 1000; 
        user.loginAttempts = 0; 
      }

     
      await user.save();
      return res.status(401).send({ message: "Invalid Password!" });
    } else {
   
      user.loginAttempts = 0;
      user.lockUntil = undefined;

      await user.save();

   
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, 
      });

      if (!token) {
        console.error("Token generation failed");
        return res.status(500).send({ message: "Token generation failed" });
      }

    
      const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

      
      req.session.token = token;

      
      return res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        roles: authorities,
        token: token, 
      });
    }
  } catch (err) {
  
    return res.status(500).send({ message: err.message });
  }
};





exports.signout = async (req, res, next) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    next(err); 
  }
};


