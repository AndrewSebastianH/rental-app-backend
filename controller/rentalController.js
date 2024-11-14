// rentController.js
const { validationResult } = require("express-validator");
const { RentalTransaction, Item } = require("../model");
const axios = require("axios");
const crypto = require("crypto");

exports.rentItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id: itemId } = req.params;
    const { rentLength } = req.body;
    const userId = req.user.id;

    // Check if item exists
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ message: `Item id number ${itemId} not found.` });
    }

    // Check if the user is already renting the item
    const existingTransaction = await RentalTransaction.findOne({
      where: { itemId, renterId: userId, rentalStatus: "active" },
    });

    if (existingTransaction) {
      return res
        .status(400)
        .json({ message: "You are already renting this item." });
    }

    // Prepare Midtrans request payload
    const orderId = `rent_${userId}_${itemId}_${Date.now()}`;
    const grossAmount = Number(item.price).toFixed(2);

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        user_id: userId,
        email: req.user.username,
      },
    };

    // Call Midtrans API
    const midtransResponse = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            process.env.MIDTRANS_SERVER_KEY
          ).toString("base64")}`,
        },
      }
    );

    // Create a pending rental transaction
    await RentalTransaction.create({
      itemId,
      renterId: userId,
      startDate: new Date(),
      endDate: new Date(Date.now() + rentLength * 24 * 3600 * 1000),
      orderId,
    });

    res.status(201).json({
      message: "Rental initiated. Complete payment to proceed.",
      orderId,
      snapToken: midtransResponse.data.token,
      paymentUrl: midtransResponse.data.redirect_url,
    });
  } catch (error) {
    console.error("Error processing rental:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.paymentWebhook = async (req, res) => {
  try {
    // console.log("Incoming Webhook Payload:", req.body);

    const {
      order_id: orderId,
      transaction_status: status,
      gross_amount,
      signature_key,
      status_code,
    } = req.body;

    const merchantServerKey = process.env.MIDTRANS_SERVER_KEY;

    // Generate the string to be hashed (according to Midtrans' signature key logic)
    const signatureString = `${orderId}${status_code}${gross_amount}${merchantServerKey}`;

    // Generate SHA512 hash of the signature string
    const generatedSignature = crypto
      .createHash("sha512")
      .update(signatureString)
      .digest("hex");

    // Compare signature
    if (generatedSignature !== signature_key) {
      return res
        .status(400)
        .json({ message: "Invalid signature, ignoring notification" });
    }

    // Find the rental transaction by orderId
    const rentalTransaction = await RentalTransaction.findOne({
      where: { orderId },
    });

    if (!rentalTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update the transaction status and rental status based on Midtrans response
    if (status === "settlement") {
      // Payment success
      await rentalTransaction.update({
        rentalStatus: "active",
        transactionStatus: "settlement",
      });
    } else if (status === "pending") {
      await rentalTransaction.update({ transactionStatus: "pending" });
    } else if (status === "cancel") {
      await rentalTransaction.update({
        transactionStatus: "canceled",
        rentalStatus: "canceled",
      });
    }

    res
      .status(200)
      .json({ message: "Webhook processed successfully", orderId });
  } catch (error) {
    console.error("Error in webhook:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTransactionStatus = async (req, res) => {
  const { id: orderId } = req.params;
  try {
    const transaction = await RentalTransaction.findOne({ where: { orderId } });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Success retrieving transaction status",
      orderId,
      status: transaction.transactionStatus,
    });
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await RentalTransaction.findAll({
      where: { renterId: userId },
    });

    res.status(200).json({
      message: "Success fetching transactions",
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions: ", error);
    res.status(500).json({ error: error.message });
  }
};
