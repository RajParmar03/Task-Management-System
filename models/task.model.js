const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        enum : ["high", "medium", "low"],
        required : true,
        default : "low"
    },
    status : {
        type : String,
        enum : ["pending", "in-progress", "completed"],
        required : true,
        default : "todo"
    },
    dueDate : {
        type : Date,
    },
    reminder : {
        type : Date
    },
    category : {
        type : String,
    },
    collabUsers : {
        type : Array,
        default : []
    }

});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;