const mongoose = require("mongoose");
const { Schema } = mongoose;

const statusEnum = ['To Do', 'Proceeding', 'Done'];
const priorityEnum = ['Low', 'High'];

const taskSchema = new Schema({
    title: { type: String, required: true }, 
    desc: String,
    status: { type: String, default: 'To Do', enum: statusEnum, required: true },
    priority: { type: String, enum: priorityEnum },
    deadline: {
        type: Date,
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'Deadline must be greater than or equal to the current date.'
        }
    },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
