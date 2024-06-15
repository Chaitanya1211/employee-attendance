const mongoose = require("mongoose");
function getISTDate() {
    const now = new Date();
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate;
}

const projectSchema= mongoose.Schema({
    "projectId":{
        type : String,
        required: true
    },
    "projectName":{
        type : String,
        required: true
    },
    "projectImage":{
        type : String
    },
    "projectDesc":{
        type:String
    },
    "startDate":{
        type:String,
        default: getISTDate
    }
},{
    timestamps : true
})
const Project = mongoose.model("projects", projectSchema);
module.exports = Project