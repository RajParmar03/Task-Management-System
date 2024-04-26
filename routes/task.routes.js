const express = require('express');

const {getAllTask, createTask, updateTask, deleteTask} = require('../controllers/task.controller');
const authentication = require('../middlewares/authentication');
const secure = require('../middlewares/secure');

const router = express.Router();

router.get("/" , authentication, getAllTask);
router.post("/", authentication, createTask);
router.put("/:id", authentication, secure, updateTask);
router.delete("/:id", authentication, secure, deleteTask);


module.exports = router;