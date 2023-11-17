const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes.js"); // route file
const db = require("./index.js");  // coneection file

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/tasks", routes); //route endpoints
app.listen(5000, () => console.log("Express Server Started at Port 5000"));
