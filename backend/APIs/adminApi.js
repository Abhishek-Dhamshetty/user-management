const express = require("express");
const adminApp = express.Router();
const Admin=require('../models/adminModel')
// Example route
adminApp.get("/", (req, res) => {
  res.send("Admin API works!");
});

module.exports = adminApp; // ✅ Export the router
