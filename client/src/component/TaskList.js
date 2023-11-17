import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import '../App.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then((response) => {
        console.log(response.data.message);
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const completeTask = (task) => {
    // Implement the functionality to update the 'completed' status
    const updatedTask = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: true,
    };

    axios
      .put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask)
      .then((response) => {
        console.log(response.data);
        // history.push('/');
        // navigate("/")
        axios
          .get("http://localhost:5000/api/tasks")
          .then((response) => setTasks(response.data))
          .catch((error) => console.error("Error fetching tasks:", error));
      })
      .catch((error) => console.error("Error updating task:", error));
  };


  console.log("tasks", tasks);

  return (
    <div>
      <h2>Task Listing</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description} - Due:{" "}
            {new Date(task.dueDate).toLocaleDateString()} - Status:{" "}
            {task.completed ? "Completed" : "Not Completed"}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            {!task.completed && (
              <button onClick={() => completeTask(task)}>Complete</button>
            )}
            {!task.completed && <Link to={`/edit/${task._id}`}>Edit</Link>}
          </li>
        ))}
      </ul>
      <span onClick={() => navigate("/create")}>Create New Task</span>
    </div>
  );
};

export default TaskList;
