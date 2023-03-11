const mongoose = require("mongoose");

const CompeSchema =new mongoose.Schema({
    user:{
        type: String,
        required: true,
        unique: false,
    },
    name: {
        type: String,
        required:[true, "please provide name"],
        unique: false,
    },
    members:{
        type: Number,
        required:[true, "enter a number"],
        unique: false,
    },
    description:{
        type: String,
        required:[true, "enter description"],
        unique:false,
    },
    show:{
        type: Boolean,
        default: true
    }
})

module.exports= mongoose.model.Compes ||
mongoose.model("Compe", CompeSchema);