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

exports.update = async (req, res) => {
  try {
    const { boardid } = req.params;

    const updatedBoard = await prisma.board.update({
      where: {
        id: boardid,
      },
      data: req.body,
    });

    res.json({
      status: true,
      message: 'Board successfully updated',
      data: updatedBoard,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating board' });
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
