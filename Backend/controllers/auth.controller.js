const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_Secret } = require ('../config/auth')

exports.signup = async (req, res, next) => {
    try {
        const userData = req.body;
        console.log("Request body:", userData);

        const newUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: userData.role // Assign the role
            },
            select: { // Ensure the role is selected
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
  

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          roles: user.role,
        },
        process.env.JWT_Secret,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };