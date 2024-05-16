const mongoose = require("mongoose");
function getISTDate() {
    const now = new Date();
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate;
  }

const bugSchema = mongoose.Schema({
    projectId:{
        type: String,
        required : true,
        ref:'Project'
    },
    raisedBy:{
        type: String,
        required : true,
        ref : 'Employee'
    },
    assignedTo:{
        type: String,
        required : true,
        ref : 'Employee'
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
    current_status:{
        type:String,
        enum :['OPEN','RECHECKING','CLOSED','INVALID','INPROGRESS','DONE'],
        required :true,
        default : 'OPEN'
    },
    qa_status:{
        type: String,
        enum:['OPEN','RECHECKING','CLOSED'],
        required:true
    },
    dev_status:{
        type: String,
        enum:['INVALID','INPROGRESS','DONE'],
    },
    priority:{
        type: String,
        enum:['LOW','MEDIUM','HIGH'],
        required:true
    },
    raised_on :{
        type: Date,
        default: getISTDate
    },
    latest_update:{
        type : Date
    },
    updated_by :{
        type:String,
        ref : 'Employee'
    }
},{
    timestamps : true
});
const Bug = mongoose.model('Bug', bugSchema);
module.exports = Bug;