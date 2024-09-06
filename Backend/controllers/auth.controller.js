const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_Secret } = require ('../config/auth');
const config = require ('../config/auth.config')
const crypto = require("crypto");

require('dotenv').config();


  exports.signup = async (req, res, next) => {
    try {
        const userData = req.body;
        console.log("Request body:", userData);

        // Hash the password before storing it
       

        const newUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: bcrypt.hashSync(req.body.password, 8), 
                role: userData.role 
            },
            select: { 
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });

        console.log("User created:", newUser);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const passwordIsValid = bcrypt.compareSync(password, user.password);
  
      if (!passwordIsValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });
      console.log(`User ID: ${user.id}`);
      // console.log ('rrrrr',token)
      return res.status(200).json({ token, id: user.id ,role:user.role});
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
  };
  exports.forgotPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const token = crypto.randomBytes(20).toString("hex");
  
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();
  
      const resetUrl = `http://${req.headers.host}/reset-password/${token}`;
  
      // Envoyer un SMS avec Twilio
    //   client.messages
    //     .create({
    //       body: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    //       from: twilioConfig.fromPhone,
    //       to: `+${user.phoneNumber}`
    //     })
    //     .then(message => {
    //       console.log(`SMS sent: ${message.sid}`);
    //       res.status(200).send({ message: "Password reset SMS sent" });
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       res.status(500).send({ message: "Failed to send SMS" });
    //     });
  } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
  };
  exports.resetPassword = async (req, res) => {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).send({ message: "Password reset token is invalid or has expired." });
      }
  
      user.password = bcrypt.hashSync(req.body.password, 8);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.status(200).send({ message: "Password has been reset" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  
  