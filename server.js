const express = require("express");
const cors = require("cors")
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const testsRoute = require("./routes/testsRoute");

// routes

app.use(cors("/api/user", userRoute));
app.use(cors("/api/admin", adminRoute));
app.use(cors("/api/doctor", doctorRoute));
app.use(cors("/api/tests", testsRoute));


// PORT
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
