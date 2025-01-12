const db = require("../config/db");
const forge = require("node-forge");

/**
 * User Model to handle database operations for the `en4_users` table.
 */
const User = {
  /**
   * Retrieve all users from the database.
   *
   * @param {Function} callback - Callback function to handle the result or error.
   */
  getAllUsers: (callback) => {
    const query = "SELECT * FROM en4_users";
    // Execute the query to fetch all users
    db.query(query, callback);
  },

  /**
   * Create a new user in the database.
   *
   * @param {Object} userData - The user data to insert into the database.
   * @param {Function} callback - Callback function to handle the result or error.
   */
  createUser: (userData, callback) => {
    const query = "INSERT INTO en4_users SET ?";
    // Execute the query to insert a new user
    db.query(query, userData, callback);
  },

  /**
   * Update an existing user's information in the database.
   *
   * @param {number} id - The ID of the user to update.
   * @param {Object} userData - The updated user data.
   * @param {Function} callback - Callback function to handle the result or error.
   */
  updateUser: (id, userData, callback) => {
    const query = "UPDATE en4_users SET ? WHERE userId = ?";
    // Execute the query to update the user with the given ID
    db.query(query, [userData, id], callback);
  },

  /**
   * Delete a user from the database.
   *
   * @param {number} id - The ID of the user to delete.
   * @param {Function} callback - Callback function to handle the result or error.
   */
  deleteUser: (id, callback) => {
    const query = "DELETE FROM en4_users WHERE userId = ?";
    // Execute the query to delete the user with the given ID
    db.query(query, id, callback);
  },
};

module.exports = User;
