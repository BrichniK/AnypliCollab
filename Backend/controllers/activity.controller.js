const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



exports.show = async function getActivitys(req, res) {
  try {
    const activities = await prisma.activity.findMany();
    res.json({
      status: true,
      message: "Activities successfully fetched",
      data: activities,
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      status: false,
      message: "Error fetching activities",
      error: error.message,
    });
  }
};




  

  exports.showById = async function getActivity(req, res) {
    try {
      const { activityid } = req.params;
  
      const activity = await prisma.activity.findFirst({
        where: {
          id: activityid,
        },
      });
  
      if (!activity) {
        return res.status(404).json({
          status: false,
          message: "activity not found",
        });
      }
  
      res.json({
        status: true,
        message: "activity Successfully fetched",
        data: activity,
      });
    } catch (error) {
      console.error("Error fetching activity by ID:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  

  exports.update = async function updateActivity(req, res) {
    try {
      const { activityid } = req.params;
  
      const activity = await prisma.activity.findFirst({
        where: {
          id: activityid,
        },
      });
  
      if (!activity) {
        return res.status(404).json({
          status: false,
          message: "Activity not found",
        });
      }
  
      const updatedActivity = await prisma.activity.update({
        where: {
          id: activityid,
        },
        data: req.body,
      });
  
      res.json({
        status: true,
        message: "Activity Successfully updated",
        data: updatedActivity
      });
    } catch (error) {
      console.error("Error updating activity:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };

  exports.delete = async function deleteActivity(req, res) {
    try {
      const { activityid } = req.params;
  
      const activity = await prisma.activity.findFirst({
        where: {
          id: activityid,
        },
      });
  
      if (!activity) {
        return res.status(404).json({
          status: false,
          message: "activity not found",
        });
      }
  
      await prisma.activity.delete({
        where: {
          id: activityid,
        },
      });
  
      res.json({
        status: true,
        message: "activity successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting activity:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  
  exports.add = async function(req, res) {
    try {
      const { userId, boardId, description, date } = req.body;
  
      if (!userId || !boardId || !description || !date) {
        return res.status(400).json({
          status: false,
          message: "Missing required fields",
        });
      }
  
      const newActivity = await prisma.activity.create({
        data: {
          userId,
          boardId,
          description,
          date,
        },
      });
  
      res.status(200).json({
        status: true,
        data: newActivity,
        message: "Activity created successfully",
      });
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  };
  
  