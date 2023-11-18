import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert('All fields are required.');
      return;
    }

    if (new Date(dueDate) < new Date()) {
      alert('Due date cannot be in the past.');
      return;
    }

    const newTask = { title, description, dueDate };

    axios.post('http://localhost:5000/api/tasks', newTask) // Replace with your backend URL
      .then(response => {
        navigate('/');
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <div>
      <h2 id='button'>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
