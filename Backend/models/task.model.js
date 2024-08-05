const mongoose = require("mongoose");
const { Schema } = mongoose; 

const statusEnum = ['To Do', 'Proceeding', 'Done'];
const priorityEnum = ['Low', 'High'];

const taskSchema = new Schema({
    title: { type: String, required: true }, 
    desc: String,
    status: { type: String, default: 'To Do', enum: statusEnum, required: true },
    priority: { type: String, enum: priorityEnum },
    deadline: Date,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
