import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Dashboard2CSS from "./Dashboard2.module.css"; // Import the CSS module

function Dashboard() {
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const [searchTerm, setSearchTerm] = useState(""); // For search
  const [filterPriority, setFilterPriority] = useState(""); // For priority filter

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

  const onSubmit = (data) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, data],
    }));
    setShowForm(false);
  };

  // Filter and search logic for tasks
  const filterTasks = (taskList) => {
    return taskList.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterPriority === "" || task.priority === filterPriority)
    );
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
      </div>

      {/* Top Bar: Search and Priority Filter */}
      <div className={Dashboard2CSS["search-filter-bar"]}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Dashboard2CSS["search-bar"]}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className={Dashboard2CSS["filter-select"]}
        >
          <option value="">Filter by Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {showForm && (
        <div className={Dashboard2CSS["form-modal"]}>
          <div className={Dashboard2CSS["form-content"]}>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Task Title:
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                  })}
                />
                {errors.title && <p className={Dashboard2CSS["error-message"]}>{errors.title.message}</p>}
              </label>
              <label>
                Description:
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters long",
                    },
                  })}
                />
                {errors.description && <p className={Dashboard2CSS["error-message"]}>{errors.description.message}</p>}
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  {...register("dueDate", {
                    required: "Due date is required",
                  })}
                />
                {errors.dueDate && <p className={Dashboard2CSS["error-message"]}>{errors.dueDate.message}</p>}
              </label>
              <label>
                Priority:
                <select
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && <p className={Dashboard2CSS["error-message"]}>{errors.priority.message}</p>}
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
        <h1>General Task Board</h1>
        <div className={Dashboard2CSS["kanban-board"]}>
          <div
            className={Dashboard2CSS["kanban-column"]}
            id="todo"
            onDrop={(event) => drop(event, "todo")}
            onDragOver={allowDrop}
          >
            <h2>To-Do</h2>
            <div className={Dashboard2CSS["task-list"]}>
              {filterTasks(tasks.todo).map((task, index) => (
                <div
                  key={index}
                  className={`${Dashboard2CSS["kanban-task"]} ${Dashboard2CSS["todo-task"]}`}
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
                  className={`${Dashboard2CSS["kanban-task"]} ${Dashboard2CSS["inprogress-task"]}`}
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
                  className={`${Dashboard2CSS["kanban-task"]} ${Dashboard2CSS["completed-task"]}`}
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