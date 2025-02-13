import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Task.module.css"; // Import the CSS module

function Task() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]); // Store tasks
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Track if we are in update mode
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null); // Track the index of the task being updated

  const [searchTerm, setSearchTerm] = useState(""); // For search
  const [filterPriority, setFilterPriority] = useState(""); // For priority filter

  const onSubmit = (data) => {
    if (isUpdateMode) {
      // Update the task
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[currentTaskIndex] = data;
        return updatedTasks;
      });
      setIsUpdateMode(false);
      setCurrentTaskIndex(null);
    } else {
      // Add a new task
      setTasks((prevTasks) => [...prevTasks, data]);
    }
    reset();
    setShowForm(false);
  };

  const handleDelete = (index) => {
    // Delete task from the list
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const handleUpdate = (index) => {
    // Populate the form with the task to update
    const taskToUpdate = tasks[index];
    reset(taskToUpdate);
    setShowForm(true);
    setIsUpdateMode(true);
    setCurrentTaskIndex(index);
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
    <div className={styles["task-section"]}>
      <div className={styles["top-right-buttons"]}>
        <button className={styles["add-project-btn"]} onClick={() => {
          setShowForm(true);
          setIsUpdateMode(false);
          reset({
            title: "",
            description: "",
            dueDate: "",
            priority: "low",
            numberOfTasks: 1,
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
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                  })}
                />
                {errors.title && <p className={styles["error-message"]}>{errors.title.message}</p>}
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
                {errors.description && <p className={styles["error-message"]}>{errors.description.message}</p>}
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  {...register("dueDate", {
                    required: "Due date is required",
                  })}
                />
                {errors.dueDate && <p className={styles["error-message"]}>{errors.dueDate.message}</p>}
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
                {errors.priority && <p className={styles["error-message"]}>{errors.priority.message}</p>}
              </label>
              <label>
                Number of Tasks:
                <input
                  type="number"
                  {...register("numberOfTasks", {
                    required: "Number of tasks is required",
                    min: {
                      value: 1,
                      message: "Number of tasks must be at least 1",
                    },
                  })}
                  defaultValue={1}
                />
                {errors.numberOfTasks && <p className={styles["error-message"]}>{errors.numberOfTasks.message}</p>}
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
            <h3>{task.title}</h3>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Number of Tasks:</strong> {task.numberOfTasks}</p>

            <button
              className={styles["addtask-btn"]}
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