# Pyramidions Node.js Backend Project

This project implements a robust user authentication system using *Node.js, **Express.js, and **MySQL*. It features secure registration, login, JWT-based authentication, account locking after multiple failed login attempts, and optional automatic unlocking. Additionally, rate limiting is implemented to prevent brute-force attacks.

---

## Features

1. *User Registration*
   - Securely register new users with password hashing.

2. *User Login*
   - Authenticate users and provide a JWT token.
   - Accounts are locked after 3 failed login attempts.

3. *Protected Profile API*
   - Access user profile details using JWT for secure authorization.

4. *Account Locking*
   - Lock accounts after failed login attempts. Optional timed unlocking can be configured.
---

## Technologies Used

- *Node.js* (Backend framework)
- *Express.js* (Server-side application framework)
- *MySQL* (Relational database)
- *bcrypt* (Password hashing)
- *jsonwebtoken* (JWT authentication)

---

## Prerequisites

Ensure the following are installed on your system:
- *Node.js* (v16 or above)
- *MySQL* (v8 or above)
- *Git* (for cloning the repository)

---
## The command to run the server using 

npx nodemon server.js

-----
## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Asha-das/AshaB-Pyramidion.git
cd AshaB-Pyramidion