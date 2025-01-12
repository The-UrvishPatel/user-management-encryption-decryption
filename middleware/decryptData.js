const {
  loadOrGenerateRSAKeys,
  decryptDataWithPrivateKey,
} = require("../security/security");

/**
 * Middleware to decrypt incoming encrypted data in the request body.
 *
 * Decrypts the `en_user_data` field from the request body using the server's private RSA key
 * and replaces `req.body` with the decrypted data.
 *
 * @returns {Function} Middleware function for decryption.
 */
const decryptData = () => {
  return (req, res, next) => {
    try {
      // Extract encrypted data from request body
      const encryptedData = req.body;

      // Load or generate RSA key pair for the server
      let { privateKey: serverPrivateKey, publicKey: serverPublicKey } =
        loadOrGenerateRSAKeys("server");

      // Decrypt the encrypted data using the server's private key
      const data = decryptDataWithPrivateKey(
        encryptedData.en_user_data,
        serverPrivateKey
      );

      // Parse the decrypted data and attach it to req.body
      req.body = JSON.parse(data);

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle decryption failure and send an appropriate error response
      return res
        .status(400)
        .json({ status: "error", message: "Decryption failed!" });
    }
  };
};

module.exports = decryptData;
