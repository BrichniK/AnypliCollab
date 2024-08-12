const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();


exports.add =  async function createBoard(req, res) {
    try {
      const board = await prisma.board.create({
        data: req.body,
      });
  
      res.status(201).json({
        status: true,
        message: "Board Successfully Created",
        data: board,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'server error'
      });
    }
  }

  exports.show =  async function getBoards (req, res) {
    const boards = await prisma.board.findMany();
  
    res.json({
      status: true,
      message: "Boards Successfully fetched",
      data: boards,
    });
  }
  exports.showById = async function getBoard(req, res) {
    const { boardid } = req.params;
    const board = await prisma.board.findFirst({
      where: {
        id: boardid,
      },
    });
  
    res.json({
      status: true,
      message: "Board Successfully fetched",
      data: board,
    });
  }

  exports.update = async function updateBoard(req, res) {
    try {
      const { boardid } = req.params;
  
      const board = await prisma.board.findFirst({
        where: {
          id: boardid,
        },
      });
  
      if (!board) {
        return res.status(401).json({
          status: false,
          message: 'Board not found',
        });
      }
  
      const updatedBoard = await prisma.board.update({
        where: {
          id: boardid,
        },
        data: req.body,
      });
  
      res.json({
        status: true,
        message: 'Board Successfully updated',
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }