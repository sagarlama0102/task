import Dashboard2CSS from "./Dashboard2.module.css"

function TaskStatistics({ tasks }) {
  const totalTasks = Object.values(tasks).flat().length
  const todoTasks = tasks.todo.length
  const inProgressTasks = tasks.inprogress.length
  const completedTasks = tasks.completed.length

  return (
    <div className={Dashboard2CSS["task-statistics"]}>
      <h2>Task Statistics</h2>
      <div className={Dashboard2CSS["stats-container"]}>
        <div className={Dashboard2CSS["stat-item"]}>
          <span className={Dashboard2CSS["stat-label"]}>Total Tasks:</span>
          <span className={Dashboard2CSS["stat-value"]}>{totalTasks}</span>
        </div>
        <div className={Dashboard2CSS["stat-item"]}>
          <span className={Dashboard2CSS["stat-label"]}>To-Do:</span>
          <span className={Dashboard2CSS["stat-value"]}>{todoTasks}</span>
        </div>
        <div className={Dashboard2CSS["stat-item"]}>
          <span className={Dashboard2CSS["stat-label"]}>In Progress:</span>
          <span className={Dashboard2CSS["stat-value"]}>{inProgressTasks}</span>
        </div>
        <div className={Dashboard2CSS["stat-item"]}>
          <span className={Dashboard2CSS["stat-label"]}>Completed:</span>
          <span className={Dashboard2CSS["stat-value"]}>{completedTasks}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskStatistics

