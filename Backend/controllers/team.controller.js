const Team = require ('../models/team.model')

async function add(req, res, next) {
    try {
        const team = new Team(teamData);
        const savedTeam = await team.save();
        res.status(201).json(savedTeam);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding Team", error: err.message });
    }
}


async function show(req, res, next) {
    try {
        const data = await Team.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving Teams", error: err });
    }
}

async function dlete(req, res, next) {
    try {
        await Team.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Team removed' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting Team", error: err });
    }
}

module.exports = { add, show, dlete};