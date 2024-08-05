const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const projectSchema = new Schema ({

    nameP : String , 
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task', required: true }],
    nameT: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    

})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;