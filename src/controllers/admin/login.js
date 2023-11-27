const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");





// shared vars
const secretKey = process.env.JWT_SECRET_KEY;
// 

router.post("/loginadmin", (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "23h" });

    res.json({ token });
  } else {
    res.status(401).json({ message: "არასწორი მონაცემები" });
  }
});
router.get("/checkadmintoken", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    res.json({ message: "Token is valid", user: decoded });
  });
});

module.exports = router;
