# User Management System with Encryption and Decryption

This project is a secure and efficient **User Management System** designed to handle user data with a focus on confidentiality and integrity. It uses encryption and decryption techniques to protect sensitive information during storage and transmission.

## Current Project Approach using 4 keys based on RSA (Public/Private keys)

![4 key approach](https://raw.githubusercontent.com/The-UrvishPatel/user-management-encryption-decryption/refs/heads/main/figures/4-key-approach.png)


![3 key approach - A thought](https://raw.githubusercontent.com/The-UrvishPatel/user-management-encryption-decryption/refs/heads/main/figures/3-key-approach.png)


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
