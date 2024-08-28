const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient(); 

// Marked the function as async
const verifyToken = async (req, res, next) => {
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

// Marked the function as async
const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.role === "ADMIN") {
      return next();
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Marked the function as async
const isManager = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.role === "MANAGER") {
      return next();
    }

    return res.status(403).send({ message: "Require Manager Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Marked the function as async
const isCollab = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.role === "COLLAB") {
      return next();
    }

    return res.status(403).send({ message: "Require Collab Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Marked the function as async
const isManagerOrCollab = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.role === "MANAGER" || user.role === "COLLAB") {
      return next();
    }

    return res.status(403).send({ message: "Require Manager or Collab Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Marked the function as async
const isAdminOrManager = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.role === "ADMIN" || user.role === "MANAGER") {
      return next();
    }

    return res.status(403).send({ message: "Require Admin or Manager Role!" });
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
