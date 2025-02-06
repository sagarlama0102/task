import React, { useState } from "react";
import styles from "./Task.module.css"; // Import the CSS module

function Task() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]); // Store tasks
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    meetings: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new task to the list
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // Reset the form
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "low",
      meetings: "",
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    // Delete task from the list
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const handleUpdate = (index) => {
    // Populate the form with the task to update
    const taskToUpdate = tasks[index];
    setNewTask(taskToUpdate);
    setShowForm(true);
    // Remove the task to be updated
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  return (
    <div className={styles["task-section"]}>
      <div className={styles["header"]}>
        <h1>Task Section</h1>
        <button className={styles["add-task-btn"]} onClick={() => setShowForm(true)}>
          <i className="fa fa-plus"></i> Add Task
        </button>
      </div>

      {showForm && (
        <div className={styles["form-container"]}>
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Meetings:
              <input
                type="text"
                name="meetings"
                value={newTask.meetings}
                onChange={handleInputChange}
                placeholder="Enter meeting details"
              />
            </label>
            <label>
              Priority:
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <button type="submit">Add Task</button>
            <button
              type="button"
              className={styles["cancel-btn"]}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Display tasks in card view */}
      <div className={styles["task-cards-container"]}>
        {tasks.map((task, index) => (
          <div key={index} className={styles["task-card"]}>
            <h3>{task.title}</h3>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <p><strong>Meetings:</strong> {task.meetings}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <button
              className={styles["update-btn"]}
              onClick={() => handleUpdate(index)}
            >
              Update
            </button>
            <button
              className={styles["delete-btn"]}
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
