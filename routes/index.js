const express = require("express");
const router = express.Router();

const pageRoutes = require("./pageRoutes");
const itemRoutes = require("./itemRoutes");
const rentRoutes = require("./rentalRoutes");

router.use("/auth", pageRoutes);
router.use("/items", itemRoutes);
router.use("/rent", rentRoutes);

module.exports = router;
