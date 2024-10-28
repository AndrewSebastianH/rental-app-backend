const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    salt: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        try {
          user.salt = crypto.randomBytes(32).toString("hex");
          user.password = hashPassword(user.password, user.salt);
        } catch (error) {
          throw new Error("Error generating salt or hashing password");
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          try {
            user.salt = crypto.randomBytes(32).toString("hex");
            user.password = hashPassword(user.password, user.salt);
          } catch (error) {
            throw new Error("Error generating salt or hashing password");
          }
        }
      },
    },
  }
);

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 32, "sha256").toString("hex");
}

User.prototype.validatePassword = function (password) {
  const hashedPassword = hashPassword(password, this.salt);
  return this.password === hashedPassword;
};

module.exports = User;
