const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.add = async function createTask(req, res) {
  const { task, activity } = req.body;

  try {
      const [newTask, newActivity] = await prisma.$transaction([
          prisma.task.create({ data: task }),
          prisma.activity.create({ data: activity }),
      ]);

      res.status(201).json({
          status: true,
          message: "Task and Activity Successfully Created",
          data: {
              task: newTask,
              activity: newActivity,
          },
      });
  } catch (error) {
      console.error("Error creating task and activity:", error);
      res.status(500).json({
          status: false,
          message: 'Server error',
          error: error.message,
      });
  }
};



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
            data: {
                status: req.body.status,  
                // priority: req.body.priority, 
               
            },
        });
        console.log("Received data for updating task:", req.body);
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
                message: "Task not found",
            });
        }

        await prisma.task.delete({
            where: {
                id: taskid,
            },
        });

        res.json({
            status: true,
            message: "Task successfully deleted",
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            status: false,
            message: "Server error",
        });
    }
};

exports.getTasksCount = async (req, res) => {
    try {
      const count = await prisma.task.count();
      res.json({ totalTasks: count });
    } catch (error) {
      console.error('Error fetching task count:', error);
      res.status(500).json({ error: 'Failed to get total tasks' });
    } finally {
      await prisma.$disconnect();
    }
  };

  exports.showByuserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await prisma.task.findMany({
        where: { userId },
      });
  
      if (tasks.length === 0) {
        return res.status(404).json({
          status: false,
          message: `No tasks found for user with id ${userId}`,
        });
      }
  
      res.json({
        status: true,
        message: "tasks successfully fetched",
        data: tasks,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({
        status: false,
        message: "Error fetching tasks",
        error: error.message,
      });
    }
  };

exports.countTasksByStatus = async (req, res) => {
    try {
      // Count tasks with status 'ToDo'
      const todoCount = await prisma.task.count({
        where: { status: 'ToDo' },
      });
  
      // Count tasks with status 'Proceeding'
      const proceedingCount = await prisma.task.count({
        where: { status: 'Proceeding' },
      });
  
      // Count tasks with status 'Done'
      const doneCount = await prisma.task.count({
        where: { status: 'Done' },
      });
  
      // Return the counts in the response
      res.json({
        ToDo: todoCount,
        Proceeding: proceedingCount,
        Done: doneCount,
      });
    } catch (error) {
      console.error('Error counting tasks by status:', error);
      res.status(500).json({ error: 'Failed to count tasks by status' });
    } finally {
      await prisma.$disconnect();
    }
  };

exports.countTasksByPriority = async (req, res) => {
    try {
 
      const highCount = await prisma.task.count({
        where: { priority: 'High' },
      });

      const lowCount = await prisma.task.count({
        where: { priority: 'Low' },
      });
  
      res.json({
        High: highCount,
        Low: lowCount,

      });
    } catch (error) {
      console.error('Error counting tasks by priority:', error);
      res.status(500).json({ error: 'Failed to count tasks by priority' });
    } finally {
      await prisma.$disconnect();
    }
  };