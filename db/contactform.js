const mongoose = require("mongoose");

const ContactFormSchema =new mongoose.Schema({
    name: {
        type: String,
        required:[true, "please provide name"],
        unique: false,
    },
    phone:{
        type: String,
        required:true,
        unique:false,
    },
    email:{
        type: String,
        required:true,
    },
    
    canWeConnect:{
        type: Boolean,
        required:true
    },
    timeslot:{
        type:String,
        required:true,
    },
    feedback:{
        type:String,
        required:true,
    }
})

module.exports= mongoose.model.ContactForms ||
mongoose.model("ContactForm", ContactFormSchema);