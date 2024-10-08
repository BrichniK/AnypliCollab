const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.add = async function createTask(req, res) {
    try {
      console.log(req.body); 
      const task = await prisma.task.create({
        data: req.body,
      });
  
      res.status(201).json({
        status: true,
        message: "Task Successfully Created",
        data: task,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }

  exports.show = async function getUsers(req, res) {
    try {
      console.log('GET /user/show called'); 
      const users = await prisma.user.findMany();
      res.json({
        status: true,
        message: "users Successfully fetched",
        data: users,
      });
    } catch (error) {
      console.error("Error fetching boards:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  

  exports.showById = async function getUser(req, res) {
    try {
      const { userid } = req.params;
  
      const user = await prisma.user.findFirst({
        where: {
          id: userid,
        },
      });
  
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
  
      res.json({
        status: true,
        message: "User Successfully fetched",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  

  exports.update = async function updateTask(req, res) {
    try {
      const { userid } = req.params;
      if (!userid) {
        return res.status(400).json({
          status: false,
          message: "User ID is required",
        });
      }
  

      const { email, password, name, imageURL, role } = req.body;
      const updateData = {};
  
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (name) updateData.name = name;
      if (imageURL !== undefined) updateData.imageURL = imageURL; 
      if (role) updateData.role = role;
  
      const user = await prisma.user.findFirst({
        where: { id: userid },
      });
  
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: userid },
        data: updateData,
      });
  
      res.json({
        status: true,
        message: "User Successfully updated",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  
  exports.deleteUser = async function deleteUser(req, res) {
    try {
      const { userid } = req.params;
  
      const user = await prisma.user.findFirst({
        where: {
          id: userid,
        },
      });
  
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
  
      await prisma.user.delete({
        where: {
          id: userid,
        },
      });
  
      res.json({
        status: true,
        message: "User successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };

  exports.getCurrentUser = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send(user);
    });
  };
  


  exports.getUserCount = async (req, res) => {
    try {
      const count = await prisma.user.count();
      res.json({ totalUsers: count });
    } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ error: 'Failed to get total users' });
    } finally {
      await prisma.$disconnect();
    }
  };

