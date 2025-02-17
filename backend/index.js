const express = require("express");
const { connection } = require("./database/db");
const app = express();
const bodyparser = require("body-parser")
const Users = require("./model/userSchema");
const Tasks = require("./model/taskSchema");
const Projects = require("./model/projectSchema");
const dotenv = require("dotenv")
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const projectRoute = require("./routes/projectRoute");
const authRoute = require("./routes/authRoute");
const uploadRoute = require("./routes/uploadRoute");
const { authenticateToken } = require("./middleware/token-middleware");
const cors = require("cors");

const {createUploadsFolder} = require("./security/helper");

dotenv.config();
app.use(cors());
app.use(bodyparser.json());
// app.use(authenticateToken);
app.use("/api/user",userRoute);
app.use("/api/task", taskRoute);
app.use("/api/project",projectRoute);
app.use("/api/auth",authRoute);

app.use("/api/file", uploadRoute);
createUploadsFolder();

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});
connection();  