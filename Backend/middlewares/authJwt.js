const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient(); 


const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  token = token.split(' ')[1]; // Si le token est envoyé comme 'Bearer <token>'

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
    // Ensure req.userId is set by authentication middleware
    if (!req.userId) {
      return res.status(401).send({ message: "User not authenticated" });
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if user has ADMIN role
    if (user.role === "ADMIN") {
      return next(); // User is admin, proceed to the next middleware
    }

    // If user is not an admin, send a forbidden response
    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    // Handle any unexpected errors
    console.error("Error in isAdmin middleware:", err.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};


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
