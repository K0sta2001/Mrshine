const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Content-Type header set to application/json


// Routes
const productRoutes = require("./src/routes/productroutes/index");
const authenticationRoutes = require("./src/routes/authentication/index");
// 

// Connecting to mongoDB
const mongoose = require("mongoose");
dotenv.config();

const db = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database", err));

module.exports = db;
// Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204); // No content needed for OPTIONS response
  } else {
    next();
  }
});

// Routes go here
app.use("/", authenticationRoutes);
app.use("/admin", productRoutes);
//

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
