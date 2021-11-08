const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true,"Titulo requerido"],
        unique: [true,"El producto debe ser unico"],
        min: [3, "Project Name debe tener al menos 3 caracteres"]
    },
    dueDate:{
        type : Date,
        required: [true,"Este campo es requerido"]
    },
    status:{
        type: String,
        default: 'I'
    }
}, { timestamps: true } );
ProjectSchema.plugin(uniqueValidator);
const Project = mongoose.model("Project",ProjectSchema);
module.exports = Project;
