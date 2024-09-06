const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.addReclamation = async (req, res) => {
  try {
    const { commentaire, dateadd, datetrait, userId } = req.body;

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const newReclamation = await prisma.reclamation.create({
      data: {
        commentaire,
        dateadd: dateadd ? new Date(dateadd) : new Date(),
        datetrait: datetrait ? new Date(datetrait) : undefined,
        statut: 'WAITING',
        userId, // Directly use the userId field here
      },
    });

    res.json({
      status: true,
      message: "Reclamation successfully created",
      data: newReclamation,
    });
  } catch (error) {
    console.error("Error adding reclamation:", error);
    res.status(500).json({
      status: false,
      message: "Error adding reclamation",
      error: error.message,
    });
  }
};



exports.show = async (req, res) => {
  try {
    const reclamations = await prisma.reclamation.findMany();
    res.json({
      status: true,
      message: "Reclamations successfully fetched",
      data: reclamations,
    });
  } catch (error) {
    console.error("Error fetching reclamations:", error);
    res.status(500).json({
      status: false,
      message: "Error fetching reclamations",
      error: error.message,
    });
  }
};


exports.showById = async (req, res) => {
  try {
    const { id } = req.params;
    const reclamation = await prisma.reclamation.findUnique({
      where: { id },
    });

    if (!reclamation) {
      return res.status(404).json({
        status: false,
        message: `Reclamation with id ${id} not found`,
      });
    }

    res.json({
      status: true,
      message: "Reclamation successfully fetched",
      data: reclamation,
    });
  } catch (error) {
    console.error("Error fetching reclamation:", error);
    res.status(500).json({
      status: false,
      message: "Error fetching reclamation",
      error: error.message,
    });
  }
};


exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentaire, dateadd, status } = req.body;

  
    const currentReclamation = await prisma.reclamation.findUnique({
      where: { id },
    });

    if (!currentReclamation) {
      return res.status(404).json({
        status: false,
        message: `Reclamation with id ${id} not found`,
      });
    }

    const updatedReclamation = await prisma.reclamation.update({
      where: { id },
      data: {
        commentaire,
        dateupdate: new Date(), 
        dateadd: dateadd ? new Date(dateadd) : currentReclamation.dateadd, 
        statut: status || currentReclamation.statut, 
      },
    });

    res.json({
      status: true,
      message: "Reclamation successfully updated",
      data: updatedReclamation,
    });
  } catch (error) {
    console.error("Error updating reclamation:", error);
    res.status(500).json({
      status: false,
      message: "Error updating reclamation",
      error: error.message,
    });
  }
};


exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.reclamation.delete({
      where: { id },
    });

    res.json({
      status: true,
      message: "Reclamation successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting reclamation:", error);
    res.status(500).json({
      status: false,
      message: "Error deleting reclamation",
      error: error.message,
    });
  }
};

exports.getReclaCount = async (req, res) => {
  try {
    const count = await prisma.reclamation.count();
    res.json({ totalRecla: count });
  } catch (error) {
    console.error('Error fetching recla count:', error);
    res.status(500).json({ error: 'Failed to get total reclas' });
  } finally {
    await prisma.$disconnect();
  }
};

exports.showByuserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reclamations = await prisma.reclamation.findMany({
      where: { userId },
    });

    if (reclamations.length === 0) {
      return res.status(404).json({
        status: false,
        message: `No reclamations found for user with id ${userId}`,
      });
    }

    res.json({
      status: true,
      message: "Reclamations successfully fetched",
      data: reclamations,
    });
  } catch (error) {
    console.error("Error fetching reclamations:", error);
    res.status(500).json({
      status: false,
      message: "Error fetching reclamations",
      error: error.message,
    });
  }
};

exports.updatestatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

  
    const currentReclamation = await prisma.reclamation.findUnique({
      where: { id },
    });

    if (!currentReclamation) {
      return res.status(404).json({
        status: false,
        message: `Reclamation with id ${id} not found`,
      });
    }

    const updatedStatus = await prisma.reclamation.update({
      where: { id },
      data: {
        statut: status || currentReclamation.statut, 
      },
    });

    res.json({
      status: true,
      message: "status successfully updated",
      data: updatedStatus,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      status: false,
      message: "Error updating status",
      error: error.message,
    });
  }
};


exports.countRecla = async (req, res) => {
  try {

    const highCount = await prisma.reclamation.count({
      where: { status: 'TREATED' },
    });

    const lowCount = await prisma.task.count({
      where: { status: '  WAITING' },
    });

    res.json({
      TREATED: highCount,
      WAITING: lowCount,

    });
  } catch (error) {
    console.error('Error counting RECLAMATION by STATUS:', error);
    res.status(500).json({ error: 'Failed to count RECLAMATION by STATUS' });
  } finally {
    await prisma.$disconnect();
  }
};


