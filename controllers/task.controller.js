const Task = require('../models/task.model');

exports.getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({userId : req.userId});
        res.status(200).json({
            status: "success",
            data: {
                tasks: tasks
            },
            error: null,
            count: tasks.length
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            data: null,
            error: error.message,
            count: 0
        });
    }

}

exports.createTask = async (req, res) => {
    try {
        let task = {...req.body, userId : req.userId};
        const newTask = new Task(task);
        const response = await newTask.save();
        res.status(201).json({
            status : "success",
            data : {
                newTask : response
            },
            error : null
        });
    } catch (error) {
        res.status(500).json({
            status : "failed",
            data : null,
            error : error.message
        })
    }
}

exports.updateTask = async (req , res) => {
    try {
        const {id} = req.params;
        const oldTask = await Task.findById(id);
        const newTask = Object.assign(oldTask,req.body);
        const response = await Task.findByIdAndUpdate({ _id: id }, newTask);
        res.status(201).json({
            status : "success",
            data : {
                newTask : response
            },
            error : null
        });
    } catch (error) {
        res.status(500).json({
            status : "fail",
            data : null,
            error : error.message
        });
    }
}

exports.deleteTask = async (req , res) => {
    try {
        const {id} = req.params;
        const response = await Task.findByIdAndDelete({_id : id});
        res.status(204).json({
            status: "success",
            data : {
                deletedTask : response
            },
            error : null
        });
    } catch (error) {
        res.status(500).json({
            status : "fail",
            data : null,
            error : error.message
        });
    }
}