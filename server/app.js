const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes.js");
const db = require("./index.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/tasks", routes);
app.listen(5000, () => console.log("Express Server Started at Port 5000"));
