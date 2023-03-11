const mongoose = require("mongoose");

const UserSchema =new mongoose.Schema({
    name: {
        type: String,
        required:[true, "please provide name"],
        unique: [true, "name exists"],
    },
    password:{
        type: String,
        required:[true, "enter your password"],
        unique:false,
    },
})

module.exports= mongoose.model.Users ||
mongoose.model("user", UserSchema);