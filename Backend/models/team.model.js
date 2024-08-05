const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }
  });

const teamSchema = new Schema ({
nameT : {type : String , required: true},
member : [userSchema],

})

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;