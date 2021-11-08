const Project = require("../models/project.model");

module.exports.createProject = (req,res) => {
    console.log("backend crear Project");
    Project.create(req.body)
    .then(project => res.json(project))
    .catch(err => res.status(500).json({err}))

}

module.exports.getAllProjects = (req,res) => {
    console.log("backend obtener getAllProjects");
    Project.find({}).sort({dueDate: 1})
        .then((project) => res.json( project ) )
        .catch((err) => res.status(500).json(err))
}

module.exports.getProject = (req,res) => {
    console.log("backend obtener getProject");
    Project.findById({_id: req.params.id})
    .then(project => res.json(project))
    .catch(err => res.json(err))
}

module.exports.getProjectByProjectname = (req,res) => {
    console.log("backend obtener getProjectByProjectname");
    Project.findOne({projectName: req.params.projectName})
    .then(project => res.json({project}))
    .catch(err => res.json(err))
}

module.exports.updateProject = (req,res) => {
    console.log("backend obtener updateProject");
    Project.updateOne({_id: req.params.id},req.body ,{new: true})
        .then(project => res.json(project))
        .catch(err => res.status(500).json({err}));
}

module.exports.updateProjectToProgress = (req,res) => {
    console.log("backend obtener updateProject");
    Project.updateOne({_id: req.params.id},{status: 'P'} ,{new: true})
        .then(project => res.json(project))
        .catch(err => res.status(500).json({err}));
}

module.exports.updateProjectToCompleted = (req,res) => {
    console.log("backend obtener updateProject");
    Project.updateOne({_id: req.params.id},{status: 'C'} ,{new: true})
        .then(project => res.json(project))
        .catch(err => res.status(500).json({err}));
}



module.exports.deleteProject = (req,res) => {
    console.log("backend obtener deleteProject");
    Project.deleteOne({_id: req.params.id})
        .then(project => res.json(project))
        .catch(err => res.status(500).json({err}));
}