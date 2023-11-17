// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskList from "./component/TaskList";
import TaskForm from "./component/TaskForm";
import EditTask from "./component/EditTask";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
