const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_Secret } = require ('../config/auth')

exports.signup = async (req, res, next) => {
    try {
        const userData = req.body;
        console.log("Request body:", userData); // Log the user data

        // Validate fields
        if (!userData.name || !userData.email || !userData.password || !userData.role) {
            return res.status(400).json({ error: 'Missing required fields or role.' });
        }

        // Validate the role
        if (!Object.values(Role).includes(userData.role)) {
            return res.status(400).json({ error: 'Invalid role.' });
        }

        // Create the new user with the provided role
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
  
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
        
      });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare passwords
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     return res.status(401).json({ error: 'Invalid email or password' });
    //   }
  
      // Create JWT token
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