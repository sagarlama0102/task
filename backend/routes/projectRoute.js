const express = require("express");
const projectController = require('../controller/project/projectController');
const router = express.Router();

router.post("/", projectController.createProject);
router.put("/:id",projectController.update);
router.delete("/:id",projectController.deleteProject);
router.get("/",projectController.getAllProjects);
router.get("/:id",projectController.getProjectById);

module.exports=router;
