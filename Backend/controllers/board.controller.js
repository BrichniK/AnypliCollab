const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.add = async (req, res) => {
  try {
    const newBoard = await prisma.board.create({
      data: {
        name: req.body.name,
        wallpaper: req.body.wallpaper
      },
    });
    res.json(newBoard);
  } catch (error) {
    console.error(error); 
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
          connect: { id: boardid },  // Connect task to the board by ID
        },
        user: {
          connect: { id: userId },  // Connect task to the user by ID
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