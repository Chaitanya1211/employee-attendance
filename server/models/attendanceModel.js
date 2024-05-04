const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    employeeEmail:{
        type : String,
        required : true
    },
    showDate:{
        type :String
    },
    today:{
        type :String,
        required : true
    },
    login:{
        type :String,
    },
    logout:{
        type :String,
    },
    isLoggedIn:{
        type : Boolean,
        default:false
    },
    isLoggedOut:{
        type : Boolean,
        default : false
    }
})

const Attendance = mongoose.model("attendance", attendanceSchema)
module.exports = Attendance;