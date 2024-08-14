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
  
  

exports.show = async function getTasks(req, res) {
    try {
      const tasks = await prisma.task.findMany();
  
      res.json({
        status: true,
        message: "Tasks Successfully fetched",
        data: tasks,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  

  exports.showById = async function getTask(req, res) {
    try {
      const { taskid } = req.params;
  
      const task = await prisma.task.findFirst({
        where: {
          id: taskid,
        },
      });
  
      if (!task) {
        return res.status(404).json({
          status: false,
          message: "Task not found",
        });
      }
  
      res.json({
        status: true,
        message: "Task Successfully fetched",
        data: task,
      });
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  

  exports.update = async function updateTask(req, res) {
    try {
      const { taskid } = req.params;
  
      if (!taskid) {
        return res.status(400).json({
          status: false,
          message: "Task ID is required",
        });
      }
  
      const task = await prisma.task.findFirst({
        where: {
          id: taskid,
        },
      });
  
      if (!task) {
        return res.status(404).json({
          status: false,
          message: "Task not found",
        });
      }
  
      const updatedTask = await prisma.task.update({
        where: {
          id: taskid,
        },
        data: req.body, 
      });
  
      res.json({
        status: true,
        message: "Task Successfully updated",
        data: updatedTask,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };

  exports.delete = async function deleteTask(req, res) {
    try {
      const { taskid } = req.params;
  
      const task = await prisma.task.findFirst({
        where: {
          id: taskid,
        },
      });
  
      if (!task) {
        return res.status(404).json({
          status: false,
          message: "task not found",
        });
      }
  
      await prisma.task.delete({
        where: {
          id: taskid,
        },
      });
  
      res.json({
        status: true,
        message: "task successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  