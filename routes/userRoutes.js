const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const decryptData = require("../middleware/decryptData");
const encryptData = require("../middleware/encryptData");
const validate = require("../middleware/validate");
const { userSchema } = require("../validations/userValidation");

/**
 * Router to handle user-related routes.
 *
 * Includes routes for:
 * - Ping test
 * - Retrieving all users
 * - Creating, updating, and deleting users
 *
 * Middleware:
 * - `decryptData`: Decrypts incoming encrypted data.
 * - `validate`: Validates request data using a Joi schema.
 * - `encryptData`: Encrypts outgoing response data.
 */

/**
 * Ping route to check server status.
 *
 * @name GET /ping
 * @function
 * @memberof module:router~userRouter
 */
router.get("/ping", userController.pong);

/**
 * Get all users route.
 *
 * @name GET /users
 * @function
 * @memberof module:router~userRouter
 */
router.get("/users", userController.getAllUsers);

/**
 * Create a new user route.
 *
 * Middleware:
 * - `decryptData`: Decrypts the incoming encrypted user data.
 * - `validate`: Validates the decrypted user data against `userSchema`.
 * - `encryptData`: Encrypts the response before sending it back.
 *
 * @name POST /users
 * @function
 * @memberof module:router~userRouter
 */
router.post(
  "/users",
  decryptData(),
  validate(userSchema),
  encryptData(),
  userController.createUser
);

/**
 * Update user route.
 *
 * @name PUT /users/:id
 * @function
 * @memberof module:router~userRouter
 * @param {string} id - The ID of the user to update.
 */
router.put("/users/:id", userController.updateUser);

/**
 * Delete user route.
 *
 * @name DELETE /users/:id
 * @function
 * @memberof module:router~userRouter
 * @param {string} id - The ID of the user to delete.
 */
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
