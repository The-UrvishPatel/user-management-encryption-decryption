# User Management System with Encryption and Decryption

This project is a secure and efficient **User Management System** designed to handle user data with a focus on confidentiality and integrity. It uses encryption and decryption techniques to protect sensitive information during storage and transmission.

## Current Project Approach using 4 keys based on RSA (Public/Private keys)

![4 key approach](https://raw.githubusercontent.com/The-UrvishPatel/user-management-encryption-decryption/refs/heads/main/figures/4-key-approach.png)

### Data Flow with Public and Private Key Encryption

1. Key Generation:
○ Both the client and the server generate their own pair of public and private keys.

○ The private key remains securely stored with its owner (client or server), while
the public key is shared with the other party for encryption.


2. Sending Data:
○ The client encrypts the data using the server's public key and sends it to the
server.

○ The server, upon receiving the encrypted data, decrypts it using its private key.


3. Data Validation:
○ The server validates the decrypted data for correctness or authenticity as per the
application's requirements.


4. Storing Data:
○ After validation, the server encrypts the data using the client’s public key.

○ The encrypted data is then stored in the database securely.


5. Retrieving Data:
○ When the data needs to be retrieved, the server fetches the encrypted data from
the database and sends it back to the client.


6. Decryption by Client:
○ The client decrypts the data using its private key, making the information
readable and usable.

This approach uses asymmetric cryptography to secure the entire process of data transmission,
validation, storage, and retrieval.



## 3 keys approach - A thought

![3 key approach - A thought](https://raw.githubusercontent.com/The-UrvishPatel/user-management-encryption-decryption/refs/heads/main/figures/3-key-approach.png)


### Secure Data Flow with Public-Private Keys and Master Key Encryption

1. Key Generation (Client-side):
○ The user (client) generates a pair of public and private keys.

○ The private key remains securely stored on the user's side and is never shared.

○ The public key, along with the data to be stored, is shared with the server.


2. Master Key Generation (Server-side):
○ Upon receiving the public key and data from the user, data is validated by the
server then the server generates a unique master key.

○ The master key is used to encrypt the user's data for secure storage.


3. Encryption and Storage:
○ The server encrypts the user's data using the master key.

○ The master key itself is encrypted using the user's public key for secure storage.

○ Both the encrypted data and the encrypted master key are stored in the
database.


4. Data Retrieval:
○ When the user requests the stored data, the server retrieves the encrypted data
and the encrypted master key from the database.

○ Both the encrypted data and encrypted master key are sent to the user.


5. Decryption (Client-side):
○ The user decrypts the master key using their private key, which ensures that only
the user can access the master key.

○ The decrypted master key is then used to decrypt the user’s data, making it
readable.


6. Key Security:
○ The private key is always stored securely on the client’s side, ensuring that only
the user can decrypt sensitive information.

○ The master key ensures efficient encryption and decryption of data while
minimizing exposure of the user’s private key.

This approach leverages a hybrid encryption model, combining the benefits of asymmetric
cryptography (for key exchange) and symmetric cryptography (for efficient data encryption).


## Features

- **User Management**: Create, list, and delete user data securely.
- **Data Encryption**: Encrypt sensitive data, such as email, before storing it with RSA.
- **Data Decryption**: Decrypt data only when necessary for secure retrieval.
- **Secure Storage**: Encrypted data is safely stored in the database (MySQL).

## Technologies Used

- **Backend**: Node.js.
- **Encryption Algorithms**: AES (Advanced Encryption Standard) and RSA for secure data handling.
- **Database**: MySQL / SQL for storing encrypted data.

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/The-UrvishPatel/user-management-encryption-decryption.git
   ```
2. Install dependencies:
   ```bash
   npm install  # For Node.js
   ```
3. Start the application:
   ```bash
   npm start  # For Node.js
   ```

## Testing

```bash
npm test
```

---

### Contributions

Feel free to fork this repository and submit pull requests for any enhancements or fixes!
