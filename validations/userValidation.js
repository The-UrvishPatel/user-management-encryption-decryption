const Joi = require("joi");

// Define a Joi schema for validating user data
const userSchema = Joi.object({
  // Name should be a string with a minimum length of 3 and a maximum length of 30
  name: Joi.string().min(3).max(30).required(),

  // Email should be a valid email address and is required
  email: Joi.string().email().required(),

  // Role should be one of "Admin", "Editor", or "Viewer" and is required
  role: Joi.string().valid("Admin", "Editor", "Viewer").required(),
});

module.exports = { userSchema };
