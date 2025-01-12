const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Directory for storing keys
const keysDir = "./keys";
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir); // Create the directory if it doesn't exist
}

/**
 * Load or generate RSA keys for a given identity (server/client).
 * If the keys already exist in the keys directory, they are loaded from the files.
 * Otherwise, new RSA keys are generated and saved to files.
 *
 * @param {string} identity - Identity for which keys are to be generated or loaded ("server" or "client").
 * @returns {Object} The private and public RSA keys.
 */
function loadOrGenerateRSAKeys(identity) {
  const privateKeyPath = path.join(keysDir, `${identity}_private_key.pem`);
  const publicKeyPath = path.join(keysDir, `${identity}_public_key.pem`);

  let privateKey, publicKey;

  // If keys exist, load them from files
  if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
    privateKey = fs.readFileSync(privateKeyPath, "utf8");
    publicKey = fs.readFileSync(publicKeyPath, "utf8");
    console.log(`${identity} RSA keys loaded from files.`);
  } else {
    // Generate new RSA key pair if keys do not exist
    const { publicKey: newPublicKey, privateKey: newPrivateKey } =
      crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

    // Save the new keys to files
    fs.writeFileSync(privateKeyPath, newPrivateKey);
    fs.writeFileSync(publicKeyPath, newPublicKey);
    privateKey = newPrivateKey;
    publicKey = newPublicKey;

    console.log(`${identity} RSA keys generated and saved.`);
  }

  return { privateKey, publicKey };
}

/**
 * Encrypt data using a public key.
 * This is used for both server-side encryption and client-side encryption.
 *
 * @param {string} data - The data to be encrypted.
 * @param {string} publicKey - The public key to encrypt the data with.
 * @returns {string} The encrypted data in base64 format.
 */
function encryptDataWithPublicKey(data, publicKey) {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encrypted.toString("base64"); // Convert encrypted data to base64 for safe transport
}

/**
 * Decrypt data using a private key.
 * This is used for both server-side decryption and client-side decryption.
 *
 * @param {string} encryptedData - The encrypted data in base64 format.
 * @param {string} privateKey - The private key to decrypt the data with.
 * @returns {string} The decrypted data in UTF-8 format.
 */
function decryptDataWithPrivateKey(encryptedData, privateKey) {
  const buffer = Buffer.from(encryptedData, "base64"); // Decode base64 to Buffer
  return crypto.privateDecrypt(privateKey, buffer).toString("utf8");
}

module.exports = {
  loadOrGenerateRSAKeys,
  decryptDataWithPrivateKey,
  encryptDataWithPublicKey,
};
