const mongoose = require("mongoose");

const HeroformSchema =new mongoose.Schema({
    name: {
        type: String,
        required:[true, "please provide name"],
        unique: false,
    },
    age: {type: String, required:true},
    height:  {type: String, required:true},
    weight:  {type: String, required:true},
    gender:  {type: String, required:true},
    foodHabits: {type: Array, required:true},
    bodyTarget: {type: Array, required:true},
    activities: {type: Array, required:true},
    frequency: {type: String, required:true},
    phone: {type: String, required:true},
    email: {type: String, required:true}
})

module.exports= mongoose.model.Heroforms ||
mongoose.model("Heroform", HeroformSchema);