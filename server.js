const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const db = require("./config/databaseConfig");
const { SECRET_KEY, seedItems } = require("./constants/constants");
const { Item, User } = require("./model");

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

    // Seed Admin User only if none exist
    const userCount = await User.count();
    if (userCount === 0) {
      const adminEmail = process.env.ADMIN_USER;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        console.error("ADMIN_USER or ADMIN_PASSWORD is not set in .env");
        return;
      }

      await User.create({
        username: adminEmail,
        password: adminPassword,
      });
      console.log("Admin user seeded to the database.");
    }

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
