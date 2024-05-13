const mongoose = require("mongoose");
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
    }
})
const Project = mongoose.model("projects", projectSchema);
module.exports = Project