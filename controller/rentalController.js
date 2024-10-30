const { validationResult } = require("express-validator");
const { RentalTransaction, Item } = require("../model");

// Rent an Item
exports.rentItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    // Check if item exists
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // Check if the user is already renting the item
    const existingTransaction = await RentalTransaction.findOne({
      where: { itemId, userId, status: "active" },
    });

    if (existingTransaction) {
      return res
        .status(400)
        .json({ message: "You are already renting this item." });
    }

    // Create a new rental transaction
    const rentalTransaction = await RentalTransaction.create({
      itemId,
      renterId: userId,
      rentalStartDate: new Date(),
      status: "active",
    });

    res.status(201).json({
      message: "Item rented successfully!",
      rentalTransaction,
    });
  } catch (error) {
    console.error("Error processing rental:", error);
    res.status(500).json({ error: error.message });
  }
};
