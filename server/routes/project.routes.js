const ProjectController = require("../controllers/project.controller");

module.exports = app => {
    app.post("/projects/new"     , ProjectController.createProject);
    app.get ("/projects"    , ProjectController.getAllProjects);
    app.get ("/api/project/:id" , ProjectController.getProject);
    app.put ("/projects/:id/toprogress" , ProjectController.updateProjectToProgress);
    app.put ("/projects/:id/tocompleted" , ProjectController.updateProjectToCompleted);

    app.delete ("/projects/:id" , ProjectController.deleteProject);

}