const { DataTypes } = require("sequelize");
const User = require("./user");
const sequelize = require("../config/databaseConfig");

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    minimumRent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "available",
    },
    lenderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "items",
    timestamps: true,
  }
);

// Associations
User.hasMany(Item, { foreignKey: "lenderId" });
Item.belongsTo(User, { foreignKey: "lenderId" });

module.exports = Item;
