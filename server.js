const express = require("express");
const app = express();
const Cors = require('cors');
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const testsRoute = require("./routes/testsRoute");

// routes
app.use(Cors({
    origin: 'https://elegant-tan-goldfish.cyclic.app'
}))
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/tests", testsRoute);

// PORT
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
