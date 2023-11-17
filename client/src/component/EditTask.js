import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tasks/${id}`)
      .then((response) => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(new Date(task.dueDate).toISOString().split("T")[0]);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert("All fields are required.");
      return;
    }

    if (new Date(dueDate) < new Date()) {
      alert("Due date cannot be in the past.");
      return;
    }

    const updatedTask = { title, description, dueDate };

    axios
      .put(`http://localhost:5000/api/tasks/${id}`, updatedTask)
      .then((response) => {
        console.log(response.data);
        // history.push('/');
        navigate("/");
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
