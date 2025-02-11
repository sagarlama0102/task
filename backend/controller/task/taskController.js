const taskSchema = require("../../model/taskSchema");

const createTask = async (req, res) => {
    try {
      const { taskTitle, taskDescription, taskDate, priority } = req.body;
      if (!taskTitle || !taskDescription || !taskDate || !priority) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const validPriorities = ["low", "medium", "high"]; // Adjust as necessary
      if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }
      const newTask = await taskSchema.create({
        taskTitle,
        taskDescription,
        taskDate,
        priority,
      });
      res.status(201).json({newTask, message: "Task created successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
};

const update = async(req, res)=>{
  try{
    const taskId = req.params.id;
    const body = req.body;

    const  task= await taskSchema.update(body, {
      where: {taskId: taskId}
    });
    if(task[0]===0){
      return res.status(404).send({message:"Task not found"});

    }
    res.status(200).send({message: "Task updated successfully"});

  }catch(error){
    console.log("Error updating :", error);
    res.status(500).json({error: "Failed to updated task"});
  }
};

const deleteTask = async (req, res)=>{
  try{
    const taskId = req.params.id;

    const result = await taskSchema.destroy({
      where: { taskId: taskId}
    });
    if(result ===0){
      return res.status(404).send({message: "Task not found"});

    }
    res.status(200).send({message: "Task deleted successfully"});

  }catch (error){
    console.log("Error deleting task:", error);
    res.status(500).json({error: "Failed to delete post"});
  }
};

const getAllTasks= async(req, res)=>{
  try{
    const tasks = await taskSchema.findAll();
    res.status(200).send({data: tasks});
  }catch(error){
    console.log("Error fetching tasks:",error);
    res.status(500).json({error:"Failed to fetch tasks"});
  }
};

const getTaskbyId= async (req, res)=>{
  try{
    const taskId = req.params.id;
    const task = await taskSchema.findByPk(taskId);

    if(!task){
      return res.status(404).send({message: "Task not found"});

    }
    res.status(200).send({data: task});
  }catch(error){
    console.log("Error fetching task:", error);
    res.status(500).json({error:"Failed to fetch task"});
  }
};

module.exports={createTask,update,deleteTask,getAllTasks,getTaskbyId};