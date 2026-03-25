
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./modules/auth/routes"));
app.use("/session", require("./modules/session/routes"));
app.use("/slot", require("./modules/slot/routes"));
app.use("/request", require("./modules/request/routes"));
app.use("/guide", require("./modules/guide/routes"));

app.listen(5000, ()=>console.log("Server running"));
