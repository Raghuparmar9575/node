const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const User = require("./models/User");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("welcome to my hotel");
});

const personRouter = require("./Routes/PersonRoutes");

app.use("/person", personRouter);

const userRouter = require("./Routes/UserRoutes");
app.use("/user", userRouter);

app.listen(3000);
