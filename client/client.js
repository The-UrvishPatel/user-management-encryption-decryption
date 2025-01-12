const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const readline = require("readline");

/**
 * Create an interface for reading input and output from the command line.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Directory for storing RSA key pairs
const keysDir = "./keys";
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir);
}

/**
 * Load existing RSA keys or generate a new RSA key pair for the specified identity.
 * @param {string} identity - Identifier for the keys (e.g., "server" or "client").
 * @returns {{ privateKey: string, publicKey: string }} - The RSA private and public keys.
 */
function loadOrGenerateRSAKeys(identity) {
  const privateKeyPath = path.join(keysDir, `${identity}_private_key.pem`);
  const publicKeyPath = path.join(keysDir, `${identity}_public_key.pem`);

  if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
    console.log(`${identity} RSA keys loaded from files.`);
    return {
      privateKey: fs.readFileSync(privateKeyPath, "utf8"),
      publicKey: fs.readFileSync(publicKeyPath, "utf8"),
    };
  }

  // Generate a new RSA key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });

  fs.writeFileSync(privateKeyPath, privateKey);
  fs.writeFileSync(publicKeyPath, publicKey);
  console.log(`${identity} RSA keys generated and saved.`);

  return { privateKey, publicKey };
}

/**
 * Encrypt data using the given public key.
 * @param {string} data - The plaintext data to encrypt.
 * @param {string} publicKey - The public key for encryption.
 * @returns {string} - Base64 encoded encrypted data.
 */
function encryptDataWithPublicKey(data, publicKey) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString("base64");
}

/**
 * Decrypt data using the given private key.
 * @param {string} encryptedData - The Base64 encoded encrypted data.
 * @param {string} privateKey - The private key for decryption.
 * @returns {string} - The decrypted plaintext data.
 */
function decryptDataWithPrivateKey(encryptedData, privateKey) {
  const buffer = Buffer.from(encryptedData, "base64");
  return crypto.privateDecrypt(privateKey, buffer).toString("utf8");
}

/**
 * Send user data to the server after encryption.
 * @param {Object} userData - The user data to be sent.
 */
async function postData(userData) {
  const { publicKey: serverPublicKey } = loadOrGenerateRSAKeys("server");

  // Encrypt user data with the server's public key
  const encryptedData = encryptDataWithPublicKey(
    JSON.stringify(userData),
    serverPublicKey
  );

  try {
    await axios.post("http://localhost:3000/api/users", {
      en_user_data: encryptedData,
    });
    console.log("Data successfully sent and saved to the database!");
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

/**
 * Retrieve and decrypt user data from the server.
 */
async function getData() {
  try {
    const response = await axios.get("http://localhost:3000/api/users");
    const { privateKey: clientPrivateKey } = loadOrGenerateRSAKeys("client");

    const users = response.data.map((user) => ({
      userId: user.userId,
      data: decryptDataWithPrivateKey(user.en_user_data, clientPrivateKey),
    }));

    console.log(users);
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

/**
 * Delete user data from the server by user ID.
 * @param {string} deleteId - The ID of the user to delete.
 */
async function deleteData(deleteId) {
  try {
    await axios.delete(`http://localhost:3000/api/users/${deleteId}`);
    console.log(`Deleted user with userId ${deleteId}.`);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

/**
 * Handle user actions such as creating, listing, or deleting users.
 * @param {string} actionType - The type of action (1: Create, 2: List, 3: Delete).
 * @param {string|null} deleteId - The ID of the user to delete (for delete action).
 * @returns {Promise<boolean>} - Whether to continue prompting for actions.
 */
async function actions(actionType, deleteId = null) {
  if (actionType === "1") {
    const userData = {
      name: await askQuestion("Name: "),
      email: await askQuestion("Email: "),
      role: await askQuestion("Role: "),
    };
    await postData(userData);
  } else if (actionType === "2") {
    await getData();
  } else if (actionType === "3") {
    const deleteId = await askQuestion("User ID to delete: ");
    await deleteData(deleteId);
  } else {
    return false; // Exit prompt
  }
  return true; // Continue prompt
}

/**
 * Prompt the user with a question and wait for their response.
 * @param {string} query - The question to ask.
 * @returns {Promise<string>} - The user's response.
 */
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

/**
 * Main function to prompt the user for actions in a loop.
 */
async function promptUser() {
  let continuePrompt = true;

  while (continuePrompt) {
    console.log(
      "\nActions:\n1. Create User\n2. List Users\n3. Delete User\nAny other key to exit\n"
    );
    const actionType = await askQuestion("Choose an action: ");
    continuePrompt = await actions(actionType);
  }

  rl.close();
}

// Start the interactive prompt
promptUser();
