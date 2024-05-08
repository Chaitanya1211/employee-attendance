const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const employeeSchema = mongoose.Schema({
    "firstName":{
        type : String,
        required : true
    },
    "middleName":{
        type:String,
    },
    "lastName":{
        type:String,
        required :true
    },
    "role":{
        type:String,
        enum:['developer','tester','intern'],
        required:true
    },
    "profileImg":{
        type :String,
        default : null
    },
    "dateOfBirth":{
        type:String,
        required:true
    },
    "gender":{
        type:String,
        required :true
    },
    "contactNumber":{
        type:String,
        required :true
    },
    "email":{
        type : String,
        required:true,
        unique :true
    },
    "addline1" : {
        type:String,
        required :true
    },
    "addline2" :{
        type:String
    },
    "city":{
        type:String,
        required :true  
    },
    "state":{
        type:String,
        required :true
    },
    "postalCode":{
        type:Number,
        required :true
    },
    "emerName":{
        type:String,
        required :true
    },
    "emerRelation":{
        type:String,
        required :true
    },
    "emerPhoneNo":{
        type:String,
        required :true
    },
    "password_hash":{
        type : String,
        required : true
    }
},{
    timestamps : true
})

employeeSchema.method({
    async matchPassword(password){
        return brcypt.compare(password,this.password_hash);
    }
})
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;