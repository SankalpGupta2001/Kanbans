const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
// const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/WorkM", {useUnifiedTopology: true,
    useNewUrlParser: true,
    }
    ).then(db => console.log('DB is connected'))
    .catch(err => console.log(err));


const usersRoute = require("./routes/usersRoute");
const projectsRoute = require("./routes/projectsRoute");
const tasksRoute = require("./routes/tasksRoute");

app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoute);




app.listen(port, () => console.log(`Node JS server listening on port ${port}`));





