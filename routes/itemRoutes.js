const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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

// Get all rented items by current user
router.get("/rented", isAuthenticated, itemController.getRentedItems);

// Get all items
router.get("/", isAuthenticated, itemController.getAllItems);

// Get item by id
router.get("/:id", isAuthenticated, itemController.getItemById);

// Get all listed items by lenderId
router.get("/:lenderId", isAuthenticated, itemController.getAllItemsByLender);

// Update a item by ID
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

// Delete a item by ID
router.delete("/:id", isAuthenticated, itemController.deleteItem);

module.exports = router;
