const express = require('express');
require('dotenv').config();
const cors = require('cors');

const CONFIG = require("./config");
const connection = require('./db');
const taskRouter = require('./routes/task.routes');
const userRouter = require('./routes/user.routes');

const PORT = CONFIG.PORT;


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req , res) => {
    res.status(200).send("Welcome to Task-Management-App");
});

app.use('/tasks', taskRouter);
app.use('/users', userRouter);

app.listen(PORT , async() => {
    try {
        await connection;
        console.log('DB connected');
    } catch (error) {
        console.log('DB connection failed : ' , error);
    }
    console.log(`server is listening on ${PORT}`);
})