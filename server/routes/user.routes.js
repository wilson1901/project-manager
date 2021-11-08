const UserController = require("../controllers/user.controller");
const ProjectController = require("../controllers/project.controller");

module.exports = app => {
    app.post("/user"     , UserController.createUser);
    //app.get ("/users"    , UserController.getAllUsers);
    app.get ("/user/:username" , UserController.getUserByUsername);
    //app.put ("/user/:id" , UserController.updateUser);
    //app.delete ("/user/:id" , UserController.deleteUser);

    //


}