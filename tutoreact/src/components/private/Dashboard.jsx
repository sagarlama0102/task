import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Dashboard2CSS from "./Dashboard2.module.css"; // Import the CSS module
import { toast } from "react-toastify";
import { API } from "../../environment";

function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    completed: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // For search
  const [filterPriority, setFilterPriority] = useState(""); // For priority filter

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${API.BASE_URL}/api/task/get_all_task`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your auth token if needed
            },
          }
        );

        const fetchedTasks = response?.data.data;

        // Organize tasks by status
        const todoTasks = fetchedTasks.filter(
          (task) => task?.status === "todo"
        );
        const inProgressTasks = fetchedTasks.filter(
          (task) => task?.status === "inprogress"
        );
        const completedTasks = fetchedTasks.filter(
          (task) => task?.status === "completed"
        );

        setTasks({
          todo: todoTasks,
          inprogress: inProgressTasks,
          completed: completedTasks,
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const taskData = {
        taskTitle: data.title,
        taskDescription: data.description,
        taskDate: data.dueDate,
        priority: data.priority,
        status: "todo",
      };

      const response = await axios.post(`${API.BASE_URL}/api/task`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const newTask = response.data.data;

      // Ensure the task is only added once
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, newTask],
      }));

      setShowForm(false);
      reset();
      toast.success("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task");
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event, task, sourceColumn) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
    event.dataTransfer.setData("source", sourceColumn);
  };

  const drop = (event, targetColumn) => {
    event.preventDefault();
    const taskData = event.dataTransfer.getData("task");
    const sourceColumn = event.dataTransfer.getData("source");

    if (taskData && sourceColumn !== targetColumn) {
      try {
        const task = JSON.parse(taskData);
        task.status = targetColumn;

        setTasks((prevTasks) => {
          const newTasks = { ...prevTasks };

          // Remove the task from the source column
          newTasks[sourceColumn] = newTasks[sourceColumn].filter(
            (t) => t.taskId !== task.taskId
          );

          // Add the task to the target column
          newTasks[targetColumn] = [...newTasks[targetColumn], task];

          return newTasks;
        });

        const token = localStorage.getItem("token");
        axios
          .put(`${API.BASE_URL}/api/task/update_task/${task.taskId}`, task, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            toast.success("Task status updated successfully");
          })
          .catch((error) => {
            console.error("Error updating task status:", error);
            toast.error("Error updating task status");
          });
      } catch (error) {
        console.error("Error parsing task data:", error);
      }
    }
  };

  const filterTasks = (taskList) => {
    return taskList.filter(
      (task) =>
        task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
                {errors.title && (
                  <p className={Dashboard2CSS["error-message"]}>
                    {errors.title.message}
                  </p>
                )}
              </label>
              <label>
                Description:
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                  })}
                />
                {errors.description && (
                  <p className={Dashboard2CSS["error-message"]}>
                    {errors.description.message}
                  </p>
                )}
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  {...register("dueDate", {
                    required: "Due date is required",
                  })}
                />
                {errors.dueDate && (
                  <p className={Dashboard2CSS["error-message"]}>
                    {errors.dueDate.message}
                  </p>
                )}
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
                {errors.priority && (
                  <p className={Dashboard2CSS["error-message"]}>
                    {errors.priority.message}
                  </p>
                )}
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
          {["todo", "inprogress", "completed"].map((status) => (
            <div
              className={Dashboard2CSS["kanban-column"]}
              key={status}
              id={status}
              onDrop={(event) => drop(event, status)}
              onDragOver={allowDrop}
            >
              <h2>{status.replace(/^\w/, (c) => c.toUpperCase())}</h2>
              <div className={Dashboard2CSS["task-list"]}>
                {filterTasks(tasks[status]).map((task, index) => (
                  <div
                    key={index}
                    className={`${Dashboard2CSS["kanban-task"]} ${
                      Dashboard2CSS[`${status}-task`]
                    }`}
                    draggable="true"
                    onDragStart={(event) =>
                      drag(event, task, status)
                    }
                  >
                    <h3>{task?.taskTitle}</h3>
                    <p>{task?.taskDescription}</p>
                    <p>Due: {task?.taskDate}</p>
                    <p>Priority: {task?.priority}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;