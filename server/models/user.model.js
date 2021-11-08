const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Titulo requerido"],
        unique: [true,"El producto debe ser unico"]
    },
    email:{
        type : String,
        required: [true,"Este campo es requerido"]
    },
    password:{
        type: String,
        required: [true,"Este campo es requerido"]
    },
    confirm:{
        type: String
    }
}, { timestamps: true } );
UserSchema.plugin(uniqueValidator);
const User = mongoose.model("User",UserSchema);
module.exports = User;