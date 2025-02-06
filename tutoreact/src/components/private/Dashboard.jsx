import React, { useState } from "react";
import Dashboard2CSS from "./Dashboard2.module.css"; // Import the CSS module

function Dashboard() {
  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    completed: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
  });

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event, task, sourceColumn) => {
    event.dataTransfer.setData("task", JSON.stringify(task)); // Pass task as JSON string
    event.dataTransfer.setData("source", sourceColumn); // Pass source column ID explicitly
  };

  const drop = (event, targetColumn) => {
    event.preventDefault();
    const taskData = event.dataTransfer.getData("task");
    const sourceColumn = event.dataTransfer.getData("source");
  
    if (taskData && sourceColumn !== targetColumn) {
      try {
        const task = JSON.parse(taskData);
  
        setTasks((prevTasks) => {
          const newTasks = { ...prevTasks };
  
          // Remove the task from the source column
          if (sourceColumn in newTasks) {
            newTasks[sourceColumn] = newTasks[sourceColumn].filter(
              (t) => t.title !== task.title
            );
          }
  
          // Check if task is already in the target column to avoid duplication
          const isTaskInTargetColumn = newTasks[targetColumn].some(
            (t) => t.title === task.title
          );
  
          // Add the task to the target column only if it's not already there
          if (!isTaskInTargetColumn) {
            newTasks[targetColumn].push(task);
          }
  
          return newTasks;
        });
      } catch (error) {
        console.error("Error parsing task data:", error);
      }
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
    setNewTask({ title: "", description: "", dueDate: "", priority: "low" });
    setShowForm(false);
  };

  return (
    <div className={Dashboard2CSS.content}>
      <div className={Dashboard2CSS["top-right-buttons"]}>
        <button
          className={Dashboard2CSS["add-task-btn"]}
          onClick={() => setShowForm(true)}
        >
          <i className="fa fa-plus"></i> Add Task
        </button>
        {/* <button className={Dashboard2CSS["notification-btn"]}>
          <i className="fa fa-bell"></i> Notifications
        </button> */}
      </div>

      {showForm && (
        <div className={Dashboard2CSS["form-modal"]}>
          <div className={Dashboard2CSS["form-content"]}>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Task Title:
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
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div id="dashboard-content">
        <h1>Dashboard</h1>
        <div className={Dashboard2CSS["kanban-board"]}>
          <div
            className={Dashboard2CSS["kanban-column"]}
            id="todo"
            onDrop={(event) => drop(event, "todo")}
            onDragOver={allowDrop}
          >
            <h2>To-Do</h2>
            <div className={Dashboard2CSS["task-list"]}>
              {tasks.todo.map((task, index) => (
                <div
                  key={index}
                  className={Dashboard2CSS["kanban-task"]}
                  draggable="true"
                  onDragStart={(event) => drag(event, task, "todo")} // Pass "todo" as source column
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due: {task.dueDate}</p>
                  <p>Priority: {task.priority}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className={Dashboard2CSS["kanban-column"]}
            id="inprogress"
            onDrop={(event) => drop(event, "inprogress")}
            onDragOver={allowDrop}
          >
            <h2>In Progress</h2>
            <div className={Dashboard2CSS["task-list"]}>
              {tasks.inprogress.map((task, index) => (
                <div
                  key={index}
                  className={Dashboard2CSS["kanban-task"]}
                  draggable="true"
                  onDragStart={(event) => drag(event, task, "inprogress")} // Pass "inprogress" as source column
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due: {task.dueDate}</p>
                  <p>Priority: {task.priority}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className={Dashboard2CSS["kanban-column"]}
            id="completed"
            onDrop={(event) => drop(event, "completed")}
            onDragOver={allowDrop}
          >
            <h2>Completed</h2>
            <div className={Dashboard2CSS["task-list"]}>
              {tasks.completed.map((task, index) => (
                <div
                  key={index}
                  className={Dashboard2CSS["kanban-task"]}
                  draggable="true"
                  onDragStart={(event) => drag(event, task, "completed")} // Pass "completed" as source column
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due: {task.dueDate}</p>
                  <p>Priority: {task.priority}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
