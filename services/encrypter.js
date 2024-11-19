const crypto = require("crypto");
const SECRET_KEY = process.env.SECRET_KEY;

function encryptContent(content) {
  const cipher = crypto.createCipher("aes-256-cbc", SECRET_KEY);
  let encrypted = cipher.update(content, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptContent(encryptedContent) {
  const decipher = crypto.createDecipher("aes-256-cbc", SECRET_KEY);
  let decrypted = decipher.update(encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encryptContent, decryptContent };
