const User = require ('../models/user.model')
const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Collab Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.managerBoard = (req, res) => {
    res.status(200).send("Manager Content.");
};


exports.addUser = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            phoneNumber: req.body.phoneNumber,
        });

        await user.save();

        if (req.body.roles) {
            const roles = await Role.find({
                name: { $in: req.body.roles }
            });

            user.roles = roles.map(role => role._id);
            await user.save();

            res.send({ message: 'User registered successfully!' });
        } else {
            const defaultRole = await Role.findOne({ name: "user" });
            user.roles = [defaultRole._id];
            await user.save();

            res.send({ message: 'User registered successfully!' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles', '-__v');
        res.json(users);
    } catch (err) {
        console.error("Error fetching users with roles:", err);
        res.status(500).send("Internal Server Error");
    }
};


exports.update = async (req, res) => {
    const id = req.params.id;

    console.log("Received ID:", id);

    if (!id) {
        return res.status(400).send({ message: "User ID is required" });
    }

    try {
        console.log("Updating user with ID:", id);
        console.log("Request body:", req.body);

        const user = await User.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });

        if (!user) {
            console.log(`User with ID ${id} not found`);
            return res.status(404).send({
                message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
        }

        console.log("User updated successfully:", user);
        res.send({ message: "User was updated successfully.", user });
    } catch (err) {
        console.error("Error during update:", err.message);
        res.status(500).send({
            message: "Error updating User with id=" + id
        });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).send({
                    message: "Not found User with id " + id
                });
            } else {
                res.send(user);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndRemove(id, { useFindAndModify: false });

    if (!user) {
      return res.status(404).send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }

    res.send({ message: "User was deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  }
};



exports.findUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).populate('roles', '-__v');

        if (user) {
            res.json(user);
        } else {
            res.status(404).send({
                message: "User not found with id=" + id
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving user with id=" + id + ": " + error.message
        });
    }
};
exports.getCurrentUser = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send(user);
    });
  };

