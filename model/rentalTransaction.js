const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("./user");
const Item = require("./item");

const RentalTransaction = sequelize.define(
  "RentalTransaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "items",
        key: "id",
      },
    },
    renterId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    tableName: "rental_transactions",
    timestamps: true,
  }
);

User.hasMany(RentalTransaction, { foreignKey: "renterId" });
RentalTransaction.belongsTo(User, { foreignKey: "renterId" });
Item.hasMany(RentalTransaction, { foreignKey: "itemId" });
RentalTransaction.belongsTo(Item, { foreignKey: "itemId" });

module.exports = RentalTransaction;
