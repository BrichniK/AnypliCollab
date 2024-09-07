const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addBoard = async (req, res) => {
  const { name, wallpaper, userId } = req.body;

  try {
    // Create the board and associated activity
    const newBoard = await prisma.board.create({
      data: {
        name,
        wallpaper,
        activities: {
          create: {
            userId,  // Pass the userId from the request
            description: `Added board : ${name} `,
            date: new Date(),
          },
        },
      },
    });

    res.json(newBoard);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ error: 'Error creating board', details: error.message });
  }
};





exports.show = async function getBoards(req, res) {
  try {
    console.log('GET /board/show called');
    const boards = await prisma.board.findMany();
    res.json({
      status: true,
      message: "Boards Successfully fetched",
      data: boards,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};



exports.updateBoard = async (req, res) => {
  const boardId = req.params.id;
  const { name, newTask } = req.body;

  try {
  
    const createdTask = await prisma.task.create({
      data: {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status || 'ToDo',
        wallpaper: newTask.wallpaper || '',
        boardId: boardId, 
      },
    });

   
    const updatedBoard = await prisma.board.update({
      where: { id: boardId },
      data: {
        name, 
        tasks: {
          connect: { id: createdTask.id }, 
        },
      },
      include: {
        tasks: true, 
      },
    });

    res.json({
      status: true,
      message: "Board updated with new task successfully",
      data: updatedBoard,
    });
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ message: 'Error updating board', error });
  }
};



exports.showById = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.findFirst({
      where: {
        id: id,
      },
    });
    res.json({
      status: true,
      message: "Board successfully fetched",
      data: board,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching board' });
  }
};


exports.addTask = async (req, res) => {
  try {
    console.log('Request parameters:', req.params);
    console.log('Request body:', req.body);

    const { boardid } = req.params;
    const { title, description, status, deadline, priority, userId } = req.body;

    if (!boardid || !userId) {
      return res.status(400).json({ error: 'Board ID and User ID are required' });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'ToDo',
        deadline: new Date(deadline),
        priority: priority || 'Low',
        board: {
          connect: { id: boardid }, 
        },
        user: {
          connect: { id: userId },  
        },
      },
    });

    res.json({
      status: true,
      message: 'Task added successfully',
      data: newTask,
    });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Error adding task', details: error.message });
  }
};

exports.getBoardsCount = async (req, res) => {
  try {
    const count = await prisma.board.count();
    res.json({ totalBoards: count });
  } catch (error) {
    console.error('Error fetching board count:', error);
    res.status(500).json({ error: 'Failed to get total boards' });
  } finally {
    await prisma.$disconnect();
  }
};



exports.delete = async (req, res) => {
  try {
    const { boardid } = req.params;

    await prisma.board.delete({
      where: {
        id: boardid,
      },
    });

    res.json({
      status: true,
      message: "Board successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting board' });
  }
};

exports.getTasksByBoardId = async (req, res) => {
  try {
    const { boardid } = req.params;

    if (!boardid) {
      return res.status(400).json({ error: 'Board ID is required' });
    }

    // Fetch the board with its related tasks
    const board = await prisma.board.findUnique({
      where: { id: boardid },
      include: { tasks: true }, // This will include tasks associated with the board
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json({
      status: true,
      data: board.tasks, // Return the list of tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getURL = async (req, res) => {
  try {
    const { boardid } = req.params;

    if (!boardid) {
      return res.status(400).json({ error: 'Board ID is required' });
    }

    // Fetch the board with its wallpaper
    const board = await prisma.board.findUnique({
      where: { id: boardid },
      select: { wallpaper: true }, // Only select the wallpaper field
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json({
      status: true,
      data: board.wallpaper, // Return the wallpaper
    });
  } catch (error) {
    console.error('Error fetching wallpaper:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.showBoardsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch boards where the user has tasks
    const boards = await prisma.board.findMany({
      where: {
        tasks: {
          some: {
            userId: userId, // Match tasks with the given userId
          },
        },
      },
      include: {
        tasks: {
          where: {
            userId: userId, // Only include tasks for the specific user
          },
        },
        users: true, // Include users associated with the board if needed
      },
    });

    if (boards.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No boards found for user with id ${userId}`,
      });
    }

    res.json({
      status: true,
      message: "Boards successfully fetched",
      data: boards,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({
      status: false,
      message: "Error fetching boards",
      error: error.message,
    });
  }
};




