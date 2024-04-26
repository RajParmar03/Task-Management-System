const Task = require("../models/task.model");

const secure = async (req, res, next) => {
    try {
        const userId = req.userId || "";
        const taskId = req.body._id || req.params.id || "";
        const task = await Task.findById(taskId); 
        if(!task){
            return res.status(404).json({
                status: "failed",
                data : null,
                error : "Task not found"
            });
        }
        if(!(userId === task.userId)){
            return res.status(400).json({
                status: "failed",
                data : null,
                error : "User is not authorized"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            status: "failed",
            data : null,
            error : error.message
        });
    }
}


module.exports = secure;