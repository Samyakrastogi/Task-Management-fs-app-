const Task = require("./model");

const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    newTask.completed = false;
    const createdTask = await newTask.save();
    res.status(200).json({message : "Task Created Successfully", createdTask});
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Bad Request, Unable to Create Task", err });
  }
};

const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json({ message: "Tasks Found", tasks });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Bad Request, Unable to Get Tasks", err });
    }
  };

  const getTaskById = async(req,res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            res.status(200).json({message : "Task Found", task});
          } else {
            res.json({ mesage: "Invalid ID, Task Not Found" });
          }
    } catch (err) {
        res.status(400).json({errorMessage : "Bad Request, Unable to Get Task by their ID", err})
        
    }
  };

  const updateTask = async (req, res) => {
    try {
      const taskData = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!taskData) {
        res.json({ error: "Task Not Found" });
      }
      res.json({ message: "Task Updated Successfully", taskData });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Bad Request, Unable to Update Task", err });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json({ message: "Task deleted successfully", task });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Bad Request, Unable to Delete Task", err });
    }
  };

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}