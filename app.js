const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

// Initialize express application
const app = express();

// Set port from environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Use the user routes for any API route prefixed with /api
app.use("/api", userRoutes);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Health check endpoint
app.get("/health", (req, res) => {
  console.log("health"); // Log for health check request
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
