const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
    projectId:{
        type: String,
        required : true
    },
    raisedBy:{
        type: String,
        required : true
    },
    assignedTo:{
        type: String,
        required : true
    },
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    images:{
        type: [String]
    },
    qa_status:{
        type: String,
        enum:['OPEN','RECHECKING','CLOSED'],
        required:true
    },
    dev_status:{
        type: String,
        enum:['INPROGRESS','DONE'],
    },
    priority:{
        type: String,
        enum:['LOW','MEDIUM','HIGH'],
        required:true
    }
},{
    timestamps : true
});
const Bug = mongoose.model('Bug', bugSchema);
module.exports = Bug;