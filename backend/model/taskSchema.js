const {DataTypes} = require("sequelize");
const {sequelize} = require("../database/db");

const Tasks = sequelize.define("tasks", {
    taskId:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    taskTitle:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    taskDescription:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    taskDate:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    priority:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

(async()=>{
    try{
        await Tasks.sync();
        console.log("task table has been created");
    }catch(error){
        console.log("Error: ", error.message);
    }
})();

module.exports = Tasks;