const { validationResult } = require("express-validator");
const { Item, RentalTransaction } = require("../model");
const { decryptContent } = require("../services/encrypter");

// Create a new item
exports.createItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, category, description, price, minimumRent, contentLink } =
      req.body;
    const item = await Item.create({
      name,
      category,
      description,
      price,
      minimumRent,
      hashedContent: contentLink,
      lenderId: req.user.id,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Items
exports.getAllItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Item.findAll();

    const itemsWithRentalStatus = await Promise.all(
      items.map(async (item) => {
        const existingRental = await RentalTransaction.findOne({
          where: { itemId: item.id, renterId: userId, rentalStatus: "active" },
        });

        return {
          ...item.toJSON(),
          isRented: !!existingRental,
        };
      })
    );

    res.status(200).json(itemsWithRentalStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Items belonging to specific lender
exports.getAllItemsByLender = async (req, res) => {
  try {
    const { lenderId } = req.body;

    const items = await Item.findAll({
      where: {
        lenderId: lenderId,
      },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all rented items by current user
exports.getRentedItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const rentalTransactions = await RentalTransaction.findAll({
      where: {
        renterId: userId,
        rentalStatus: "active",
      },
    });

    const rentedItems = await Promise.all(
      rentalTransactions.map(async (transaction) => {
        const item = await Item.findOne({
          where: {
            id: transaction.itemId,
          },
        });

        return {
          ...item.toJSON(),
          rentedAt: transaction.createdAt,
        };
      })
    );

    res.status(200).json(rentedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific listing
exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    const item = await Item.findOne({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "No listings found.",
      });
    }

    // Check if the user has already rented this item
    const rentalRecord = await RentalTransaction.findOne({
      where: {
        itemId: itemId,
        renterId: userId,
        rentalStatus: "active",
      },
    });

    const isRented = rentalRecord ? true : false;

    // Return Item details
    return res.status(200).json({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      rentRequirement: item.rentRequirement,
      isRented: isRented,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update a Item by ID
exports.updateItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, category, description, price, rentRequirement } = req.body;

    const item = await Item.findOne({ where: { id, userId: req.user.id } });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (name) item.name = name;
    if (category) item.category = category;
    if (description) item.description = description;
    if (price) item.price = price;
    if (rentRequirement) item.rentRequirement = rentRequirement;

    await item.save();

    res
      .status(200)
      .json({ message: "Success updating item!", updatedItem: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Item by ID
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const item = await Item.findOne({ where: { id, lenderId: userId } });

    if (!item) {
      return res.status(404).json({
        message: "Item not found or you do not have permission to delete it.",
      });
    }
    await item.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting Item:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.accessItemContent = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const rental = await RentalTransaction.findOne({
      where: { renterId: userId, itemId: itemId, rentalStatus: "active" },
    });

    if (!rental) {
      return res.status(403).json({
        message: "You have not rented this item or the rental has expired.",
      });
    }

    const item = await Item.findOne({ where: { id: itemId } });

    if (!item || !item.hashedContent) {
      return res
        .status(404)
        .json({ message: "No special content available for this item." });
    }

    const decryptedContent = decryptContent(item.hashedContent);

    res.status(200).json({
      message: "Access granted.",
      content: decryptedContent,
    });
  } catch (error) {
    console.error("Error Accessing Item:", error);
    return res.status(500).json({ error: error.message });
  }
};
