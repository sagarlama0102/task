const projectSchema = require('../../model/projectSchema');

const createProject = async (req, res) => {
  console.log(req.body)
  try {
    const { title, description, dueDate, priority } = req.body;
    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }
    const newProject = await projectSchema.create({
      projectTitle:title,
      projectDescription:description,
      projectDate:dueDate,
      priority,
    });
    res.status(201).json({ newProject, message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const projectId = req.params.id;
    const body = req.body;

    const project = await projectSchema.update(body, {
      where: { projectId: projectId },
    });
    if (project[0] === 0) {
      return res.status(404).send({ message: "Project not found" });
    }
    res.status(200).send({ message: "Project updated successfully" });
  } catch (error) {
    console.log("Error updating:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const result = await projectSchema.destroy({
      where: { projectId: projectId },
    });
    if (result === 0) {
      return res.status(404).send({ message: "Project not found" });
    }
    res.status(200).send({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectSchema.findAll();
    res.status(200).send({ data: projects });
  } catch (error) {
    console.log("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projectSchema.findByPk(projectId);

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    res.status(200).send({ data: project });
  } catch (error) {
    console.log("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

module.exports = {
  createProject,
  update,
  deleteProject,
  getAllProjects,
  getProjectById,
};