import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const schema = new mongoose.Schema({
  text: String,
  complete: Boolean,
});

const Todo = mongoose.model("Todo", schema);

const addTask = async (text, complete) => {
  await Todo.create({
    text: text,
    complete: complete,
  });
};

const readTasks = async () => {
  try {
    const tasks = await Todo.find({});
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTask = async (id, completed) => {
  try {
    const task = await Todo.updateOne(
      { _id: { $eq: id } },
      { $set: { complete: !completed } }
    );
    console.log(task);

    console.log(await Todo.find({ _id: { $eq: id } }));

    console.log("yooooo");
    // Handle the response or update the UI accordingly
  } catch (error) {
    console.error(error);
    // Handle any errors that occurred during the update
  }
};

const deleteTask = async (id) => {
  const task = await Todo.deleteOne({
    _id: { $eq: id },
  });
};

app.delete("/api/v1/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTask(id);
    res.status(200).json({
      complete: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/tasks", async (req, res) => {
  const tasks = await readTasks();
  res.send(tasks);
});

app.put("/api/v1/tasks/:id", async (req, res) => {
  const data = req.body.complete;
  const id = req.params.id;

  await updateTask(id, data);

  res.status(200).json({
    completed: true,
  });
});

app.post("/api/v1/tasks", async (req, res) => {
  const { text, complete } = req.body;
  console.log(req.body);

  try {
    await addTask(text, complete);
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
