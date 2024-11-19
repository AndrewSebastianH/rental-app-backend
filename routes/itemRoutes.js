const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const itemController = require("../controller/itemController");
const isAuthenticated = require("../middleware/isAuthenticated");

// Create a new item
router.post(
  "/",
  isAuthenticated,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("minimumRent")
      .optional({ checkFalsy: true })
      .isInt({ min: 0 })
      .withMessage("Minimum Rent must be a positive number"),
  ],
  itemController.createItem
);

// Get all rented items by the current user
router.get("/rented", isAuthenticated, itemController.getRentedItems);

// Get all listed items by lenderId
router.get(
  "/lender/:lenderId",
  isAuthenticated,
  itemController.getAllItemsByLender
);

// Get all items
router.get("/", isAuthenticated, itemController.getAllItems);

// Get item by ID
router.get("/:id", isAuthenticated, itemController.getItemById);

// Update an item by ID
router.put(
  "/:id",
  isAuthenticated,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("rentRequirement")
      .isString()
      .withMessage("Rent requirement is required"),
  ],
  itemController.updateItem
);

// Delete an item by ID
router.delete("/:id", isAuthenticated, itemController.deleteItem);

// Access special content
router.get("/:id/access", isAuthenticated, itemController.accessItemContent);

module.exports = router;
