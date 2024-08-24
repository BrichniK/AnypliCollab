const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require('../models/user.model');
const Role = require('../models/role.model');



verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  token = token.split(' ')[1]; 

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some(role => role.name === "ADMIN")) {
      return next();
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const isManager = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some(role => role.name === "MANAGER")) {
      return next();
    }

    return res.status(403).send({ message: "Require Manager Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const isCollab = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "Collab not found" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some(role => role.name === "COLLAB")) {
      return next();
    }

    return res.status(403).send({ message: "Require Collab Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const isManagerOrCollab = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some(role => role.name === "MANAGER") || roles.some(role => role.name === "COLLAB")) {
      return next();
    }

    return res.status(403).send({ message: "Require Manager or Collab Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const isAdminOrManager = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some(role => role.name === "MANAGER") || roles.some(role => role.name === "ADMIN")) {
      return next();
    }

    return res.status(403).send({ message: "Require Manager or Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isManager,
  isCollab,
  isManagerOrCollab,
  isAdminOrManager
  
};
module.exports = authJwt;
