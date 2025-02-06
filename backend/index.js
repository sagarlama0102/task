const express = require("express");
const { connection } = require("./database/db");
const app = express();
const bodyparser = require("body-parser")
const Users = require("./model/userSchema");
const Tasks = require("./model/taskSchema");
const dotenv = require("dotenv")
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const authRoute = require("./routes/authRoute")
const { authenticateToken } = require("./middleware/token-middleware");

dotenv.config();
app.use(bodyparser.json());
app.use(authenticateToken);
app.use("/api/user",userRoute);
app.use("/api/task", taskRoute);
app.use("/api/auth",authRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});
connection();  