const { User } = require("../model");
const { generateToken } = require("../middleware/jwtMiddleware");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    const { salt, password, ...trimmedUser } = user.toJSON();

    const token = generateToken(user);
    return res.status(200).json({ token, trimmedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && user.validatePassword(password)) {
      const token = generateToken(user);
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(201).json({ user, protected: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

module.exports;
