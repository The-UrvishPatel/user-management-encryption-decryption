const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

/**
 * Responds with "pong" for health check or testing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.pong = (req, res) => {
  res.status(500).json("pong");
};

/**
 * Retrieves all users from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).send(err); // Internal server error
    }
    res.json(results); // Send all users as JSON
  });
};

/**
 * Creates a new user in the database.
 *
 * @param {Object} req - Express request object containing user data in `req.body`.
 * @param {Object} res - Express response object.
 */
exports.createUser = (req, res) => {
  const userData = req.body;

  User.createUser(userData, (err, results) => {
    if (err) {
      if (err.errno == 1062) {
        // Handle duplicate email error
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: "error", message: "Duplicate email!" });
      }
      return res.status(500).send(err); // Internal server error
    }

    res.status(201).json({ message: "User created", userId: results.insertId });
  });
};

/**
 * Updates an existing user's information in the database.
 *
 * @param {Object} req - Express request object containing user ID in `req.params.id` and updated data in `req.body`.
 * @param {Object} res - Express response object.
 */
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  User.updateUser(userId, userData, (err, results) => {
    if (err) {
      return res.status(500).send(err); // Internal server error
    }
    res.json({ message: "User updated" }); // Successful update response
  });
};

/**
 * Deletes a user from the database.
 *
 * @param {Object} req - Express request object containing user ID in `req.params.id`.
 * @param {Object} res - Express response object.
 */
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.deleteUser(userId, (err, results) => {
    if (err) {
      return res.status(500).send(err); // Internal server error
    }
    res.json({ message: "User deleted" }); // Successful deletion response
  });
};
