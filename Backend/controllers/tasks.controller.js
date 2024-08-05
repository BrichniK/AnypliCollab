const Task = require("../models/task.model");

async function add(req, res, next) {
    try {
        
        const status = req.body.status && (req.body.status === 'To Do' ? 'Proceeding' : 'Done');

        const taskData = {
            ...req.body,
            status: status || 'To Do' 
        };
        

        const task = new Task(taskData);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding task", error: err.message });
    }
}


async function show(req, res, next) {
    try {
        const data = await Task.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving Tasks", error: err });
    }
}

async function dlete(req, res, next) {
    try {
        await Task.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Task removed' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting task", error: err });
    }
}

async function update(req, res, next) {
    try {
        const updatedtask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(updatedtask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating Task", error: err });
    }
}
async function getTaskById(req, res, next) {
    try {
      const task = await Task.findById({_id:req.params.id});
      if (!task) {
        return res.status(200).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async function updateTaskStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const task = await Task.findById(id);

      
      const updatedTask= await task.save();
  
      res.status(200).send(updatedTask);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  

module.exports = { add, show, dlete, update ,getTaskById,updateTaskStatus};
