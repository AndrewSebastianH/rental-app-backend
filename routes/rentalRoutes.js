const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const itemController = require("../controller/itemController");
const rentalController = require("../controller/rentalController");
const isAuthenticated = require("../middleware/isAuthenticated");

// Get all user transactions history
router.get(
  "/history",
  isAuthenticated,
  rentalController.getUserTransactionHistory
);

// Create a new item
router.post("/item/:id", isAuthenticated, rentalController.rentItem);

// Webhook to handle payment notifications from Midtrans
router.post("/payment-webhook", rentalController.paymentWebhook);

// Endpoint to get transaction status (for frontend polling or real-time checks)
router.get("/transaction-status/:id", rentalController.getTransactionStatus);

module.exports = router;
