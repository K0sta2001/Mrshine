const express = require("express");
const dotenv = require("dotenv");

// routes
const productRoutes = require("./src/routes/productroutes/index");
//
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//

app.use(express.json()); // Content-Type header set to application/json
// Use product routes
app.use("/api", productRoutes);

// connecting to mongoDB
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
//

// Example usage in another file
const Product = require("./src/models/products/index");



//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
