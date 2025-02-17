import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./Task.module.css"; // Import the CSS module
import { API } from "../../environment";

function Task() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]); // Store tasks
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Track if we are in update mode
  const [currentTaskId, setCurrentTaskId] = useState(null); // Track the ID of the task being updated


  const [searchTerm, setSearchTerm] = useState(""); // For search
  const [filterPriority, setFilterPriority] = useState(""); // For priority filter

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API.BASE_URL}/api/project/`);
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form submission for adding/updating a task
  const onSubmit = async (data) => {
    try {
      if (isUpdateMode) {
        // Update task - map the form fields to match API expectations
        const updateData = {
          projectTitle: data.title,
          projectDescription: data.description,
          projectDate: data.dueDate,
          priority: data.priority
        };
        await axios.put(`${API.BASE_URL}/api/project/${currentTaskId}`, updateData);
        setIsUpdateMode(false);
        setCurrentTaskId(null);
      } else {
        // Add new task - send data directly as it was working before
        await axios.post(`${API.BASE_URL}/api/project/`, data);
      }
      fetchTasks(); // Refresh task list
      reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API.BASE_URL}/api/project/${id}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update a task
  const handleUpdate = (task) => {
    setValue("title", task.projectTitle);
    setValue("description", task.projectDescription);
    setValue("dueDate", task.projectDate);
    setValue("priority", task.priority);
    setShowForm(true);
    setIsUpdateMode(true);
    setCurrentTaskId(task.projectId);
  };

  // Filter and search logic for tasks
  const filterTasks = (taskList) => {
    return taskList.filter(
      (task) =>
        task.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterPriority === "" || task.priority === filterPriority)
    );
  };

  return (
    <div className={styles["task-section"]}>
      <div className={styles["top-right-buttons"]}>
        <button className={styles["add-project-btn"]} onClick={() => {
          setShowForm(true);
          setIsUpdateMode(false);
          reset({
            title: "",
            description: "",
            dueDate: new Date().toISOString().split('T')[0],
            priority: "low"
          });
        }}>
          <i className="fa fa-plus"></i> Add Project
        </button>
      </div>

      {/* Top Bar: Search and Priority Filter */}
      <div className={styles["search-filter-bar"]}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles["search-bar"]}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className={styles["filter-select"]}
        >
          <option value="">Filter by Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className={styles["header"]}>
        <h1>Project Section</h1>
      </div>

      {showForm && (
        <div className={styles["form-modal"]}>
          <div className={styles["form-container"]}>
            <h2>{isUpdateMode ? "Update Project" : "Create New Project"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Title:
                <input
                  type="text"
                  {...register("title")}
                />
              </label>
              <label>
                Description:
                <textarea
                  {...register("description")}
                />
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  {...register("dueDate")}
                />
              </label>
              <label>
                Priority:
                <select
                  {...register("priority")}
                  defaultValue="low"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
              <button type="submit">{isUpdateMode ? "Update Project" : "Add Project"}</button>
              <button
                type="button"
                className={styles["cancel-btn"]}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Display tasks in card view */}
      <div className={styles["task-cards-container"]}>
        {filterTasks(tasks).map((task, index) => (
          <div key={index} className={styles["task-card"]}>
            <h3>{task.projectTitle}</h3>
            <p><strong>Description:</strong> {task.projectDescription}</p>
            <p><strong>Due Date:</strong> {task.projectDate}</p>
            <p><strong>Priority:</strong> {task.priority}</p>

            <button
              className={styles["addtask-btn"]}
              onClick={() => handleUpdate(task)}
            >
              Update
            </button>
            <button
              className={styles["delete-btn"]}
              onClick={() => handleDelete(task.projectId)}
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