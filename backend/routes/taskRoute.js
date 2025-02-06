const express = require("express");
const taskController = require('../controller/task/taskController');
const router = express.Router();

router.post("/", taskController.createTask);
router.put("/:id",taskController.update);
router.delete("/:id",taskController.deleteTask);
router.get("/",taskController.getAllTasks);
router.get("/:id",taskController.getTaskbyId);

module.exports=router;