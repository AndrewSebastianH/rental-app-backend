const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const db = require("./config/databaseConfig");
const { SECRET_KEY } = require("./constants/constants");

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
