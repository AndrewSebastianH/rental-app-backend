const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const db = require("./config/databaseConfig");
const { SECRET_KEY, seedItems } = require("./constants/constants");
const { Item } = require("./model");

const app = express();
const port = 3010;

// Database connection and sync
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected! :)");

    // Sync all models and create tables if they do not exist
    await db.sync({ alter: true });
    console.log("Synced all models with the database.");

    // Seed items only if none exist
    const itemCount = await Item.count();
    if (itemCount === 0) {
      await Item.bulkCreate(seedItems);
      console.log("Seeded initial items to the database.");
    } else {
      console.log("Seed data already exists, skipping seeding process.");
    }

    // Start the server
    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", routes);

// Base Route
app.get("/", (req, res) => {
  res.send("API is running ok! :)");
});

// Start the server after database sync
startServer();
