const config = require("../config/auth.config");
const User = require ("../models/user.model");
const Role = require ("../models/role.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");





exports.signup = async (req, res) => {
  try {
    // Create a new user with hashed password
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    let roles;
    
    // Check if roles are provided and if they are a string or an array
    if (req.body.roles) {
      if (typeof req.body.roles === 'string') {
        // If a single role is provided as a string, convert it to an array
        roles = await Role.find({ name: req.body.roles }).exec();
      } else if (Array.isArray(req.body.roles)) {
        // If roles are provided as an array
        roles = await Role.find({ name: { $in: req.body.roles } }).exec();
      } else {
        return res.status(400).send({ message: "Invalid roles format." });
      }

      // Debug: Log fetched roles
      console.log("Fetched roles:", roles);

      // Check if any roles are found
      if (roles.length === 0) {
        return res.status(400).send({ message: "No valid roles found." });
      }
    } else {
      return res.status(400).send({ message: "Roles must be provided." });
    }

    // Assign fetched roles to the user
    user.roles = roles.map(role => role._id);
    
    // Save the user with roles
    await user.save();

    // Send success response
    res.send({ message: "User was registered successfully!" });

  } catch (err) {
    // Handle errors
    res.status(500).send({ message: err.message });
  }
};



exports.signin = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email })
      .populate("roles", "-__v")
      .exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Check if password is valid
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      // Increment login attempts
      user.loginAttempts += 1;

      if (user.loginAttempts >= 3) {
        // Lock the account if too many failed attempts
        user.lockUntil = Date.now() + 60 * 60 * 1000; // 1 hour lock
        user.loginAttempts = 0; // Reset attempts
      }

      // Save the user and return an error response
      await user.save();
      return res.status(401).send({ message: "Invalid Password!" });
    } else {
      // Reset login attempts and lockUntil on successful login
      user.loginAttempts = 0;
      user.lockUntil = undefined;

      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      // Check if the token is generated
      if (!token) {
        console.error("Token generation failed");
        return res.status(500).send({ message: "Token generation failed" });
      }

      // Prepare user roles for response
      const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

      // Store token in session
      req.session.token = token;

      // Send response with user data and token
      return res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        roles: authorities,
        token: token, // Include the token in the response for debugging
      });
    }
  } catch (err) {
    // Handle any errors that occurred during the process
    return res.status(500).send({ message: err.message });
  }
};





exports.signout = async (req, res, next) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    next(err);  // Corrected error handling
  }
};


