const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const authController = require("../controller/authController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post(
  "/signup",
  [
    body("username").trim().isEmail().withMessage("Username must be an email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.signup
);
router.post(
  "/login",
  [
    body("username").trim().isEmail().withMessage("Username must be an email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.login
);

router.get("/protected", isAuthenticated, authController.getUser);

module.exports = router;
