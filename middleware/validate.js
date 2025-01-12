/**
 * Middleware to validate request data against a given schema.
 *
 * Validates the request body using the provided schema and returns an error response
 * if the validation fails. If the validation passes, it proceeds to the next middleware or route handler.
 *
 * @param {Object} schema - The Joi validation schema to validate the request body.
 * @returns {Function} Middleware function for request validation.
 */
const validate = (schema) => {
  return (req, res, next) => {
    // Validate the request body against the provided schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Map validation errors to an array of error messages
      const errors = error.details.map((detail) => detail.message);

      // Return a 400 Bad Request response with the validation errors
      return res.status(400).json({ errors });
    }

    // Proceed to the next middleware or route handler if validation passes
    next();
  };
};

module.exports = validate;
