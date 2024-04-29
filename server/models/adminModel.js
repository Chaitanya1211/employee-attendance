const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const adminSchema= mongoose.Schema({
    "email":{
        type : String,
        required: true
    },
    "password_hash" : {
        type : String,
        required : true
    }
})
adminSchema.method({
    async matchPassword(password){
        return brcypt.compare(password,this.password_hash);
    }
})
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin