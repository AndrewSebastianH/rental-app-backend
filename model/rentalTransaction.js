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
    rentalStatus: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionStatus: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    tableName: "rental_transactions",
    timestamps: true,
  }
);

// Associations
User.hasMany(RentalTransaction, { foreignKey: "renterId" });
RentalTransaction.belongsTo(User, { foreignKey: "renterId" });
Item.hasMany(RentalTransaction, { foreignKey: "itemId" });
RentalTransaction.belongsTo(Item, { foreignKey: "itemId" });

module.exports = RentalTransaction;
