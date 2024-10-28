const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const { User } = require("../model/user");
const authController = require("../controller/authController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post(
  "/signup",
  [
    body("username")
      .trim()
      .isAlphanumeric()
      .withMessage("Username must be alphanumeric"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.signup
);
router.post(
  "/login",
  [
    body("username")
      .trim()
      .isAlphanumeric()
      .withMessage("Username must be alphanumeric"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.login
);

router.get("/protected", isAuthenticated, authController.getUser);

module.exports = router;
