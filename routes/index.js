const express = require("express");
const router = express.Router();

const pageRoutes = require("./pageRoutes");
const itemRoutes = require("./itemRoutes");

router.use("/auth", pageRoutes);
router.use("/items", itemRoutes);

module.exports = router;
