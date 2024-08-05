const mongoose = require("mongoose");
const {isEmail} = require("validator")

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String,
     required:[true, 'Email required'], 
     unique: [true, 'This email is already used'] ,
     validate : [isEmail,'please enter a valid email']},
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Too short password'],
  },

  active: {
    type: Boolean,
    default: true,
  },

  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
  imageURL: {type : String} ,

});


UserSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
