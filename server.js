const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const testsRoute = require("./routes/testsRoute");
const path = require("path");

// middelwares
app.use(express.static(path.join(__dirname, "https://lively-crisp-1a31a5.netlify.app")));

// routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/tests", testsRoute);

// rest api
app.use("*", function (req, res){
  res.sendFile(path.join(__dirname, "https://lively-crisp-1a31a5.netlify.app"));
});

// PORT
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
