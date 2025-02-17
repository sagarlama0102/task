const express = require("express");
const taskController = require('../controller/task/taskController');
const router = express.Router();

router.post("/", taskController.createTask);
router.put("/update_task/:id",taskController.update);
router.delete("/:id",taskController.deleteTask);
router.get("/get_all_task",taskController.getAllTasks);
router.get("/:id",taskController.getTaskbyId);

module.exports=router;