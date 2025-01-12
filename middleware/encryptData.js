const {
  loadOrGenerateRSAKeys,
  encryptDataWithPublicKey,
} = require("../security/security");

/**
 * Middleware to encrypt data in the request body.
 *
 * Encrypts the request body data using the client's public RSA key and replaces
 * `req.body` with an object containing the encrypted data under the `en_user_data` key.
 *
 * @returns {Function} Middleware function for encryption.
 */
const encryptData = () => {
  return (req, res, next) => {
    try {
      // Retrieve plain data from the request body
      const data = req.body;

      // Load or generate RSA key pair for the client
      let { privateKey: clientPrivateKey, publicKey: clientPublicKey } =
        loadOrGenerateRSAKeys("client");

      // Encrypt the data using the client's public key
      const encryptedData = encryptDataWithPublicKey(
        JSON.stringify(data),
        clientPublicKey
      );

      // Replace the request body with the encrypted data object
      req.body = { en_user_data: encryptedData };

      // Log the length of the encrypted data (optional for debugging)
      console.log(encryptedData.length);

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle encryption failure and send an appropriate error response
      return res
        .status(400)
        .json({ status: "error", message: "Encryption failed!" });
    }
  };
};

module.exports = encryptData;
