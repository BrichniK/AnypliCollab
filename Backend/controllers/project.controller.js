const Project = require ('../models/project.model')

async function add(req, res, next) {
    try {
        const project = new Project(projectData);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding project", error: err.message });
    }
}


async function show(req, res, next) {
    try {
        const data = await Project.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving Projects", error: err });
    }
}

async function dlete(req, res, next) {
    try {
        await Project.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Project removed' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting project", error: err });
    }
}

module.exports = { add, show, dlete};