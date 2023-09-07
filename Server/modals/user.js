const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password: String
})

const UserModel = mongoose.model("user",UserSchema)

module.exports= UserModel