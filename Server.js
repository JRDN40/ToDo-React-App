import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import * as dotenv from 'dotenv';
import todo from "./models/TodoModel.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected.."))
    .catch((err) => console.error(err));

app.get('/todos', async (req, res) => {
    const todos = await todo.find();
    res.json(todos);
})

app.post('/todo/new', (req, res) => {
    const newTodo = new todo({
        text: req.body.text
    });
    newTodo.save();
    res.json(newTodo);
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await todo.findByIdAndDelete(req.params.id);
    res.json(result);
})
app.get('/todo/complete/:id', async (req, res) => {
    const completed = await todo.findById(req.params.id);
    completed.complete = !completed.complete;
    completed.save();
    res.json(completed);
});

app.listen(5000, () => {
    console.log('App listening on port: 5000')
})