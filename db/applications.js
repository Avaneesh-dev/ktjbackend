const mongoose = require("mongoose");

const ApplSchema =new mongoose.Schema({
    compe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'compe'
    },
    reason:{
        type: String,
        required:[true, "enter reason"],
        unique:false,
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    status:{
        type: Boolean,
    }
})

module.exports= mongoose.model.Appls ||
mongoose.model("Appl", ApplSchema);