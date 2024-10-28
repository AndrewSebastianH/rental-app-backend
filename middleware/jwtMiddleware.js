const { SECRET_KEY } = require("../constants/constants");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  return token;
};

module.exports = { generateToken };
