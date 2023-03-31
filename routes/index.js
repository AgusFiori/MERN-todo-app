const express = require("express");
const router = express.Router();

const todoRoutes = require("./api/todos");
router.use("/todos", todoRoutes);

module.exports = router;
