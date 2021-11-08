const User = require("../models/user.model");

module.exports.createUser = (req,res) => {
    console.log("backend crear User");
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({err}))

}

module.exports.getAllUsers = (req,res) => {
    console.log("backend obtener getAllUsers");
    User.find({})
        .then((user) => res.json( user ) )
        .catch((err) => res.status(500).json(err))
}

module.exports.getUser = (req,res) => {
    console.log("backend obtener getUser");
    User.findById({_id: req.params.id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

module.exports.getUserByUsername = (req,res) => {
    console.log("backend obtener getUserByUsername");
    User.findOne({username: req.params.username})
    .then(user => res.json({user}))
    .catch(err => res.json(err))
}

module.exports.updateUser = (req,res) => {
    console.log("backend obtener updateUser");
    User.updateOne({_id: req.params.id},req.body ,{new: true})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({err}));
}

module.exports.deleteUser = (req,res) => {
    console.log("backend obtener deleteUser");
    User.deleteOne({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({err}));
}