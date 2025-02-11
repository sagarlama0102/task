const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Projects = sequelize.define("projects", {
  projectId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  projectTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  try {
    await Projects.sync();
    console.log("Project table has been created");
  } catch (error) {
    console.log("Error: ", error.message);
  }
})();

module.exports = Projects;