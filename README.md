# 🛍️ E-Commerce Website

A full-stack E-Commerce website built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**.  
This project provides a simple and functional shopping experience — including product display, cart management, and user authentication.

---

## 🚀 Features

- 🔐 **User Authentication** (Sign Up / Login / Logout)  
- 🛒 **Shopping Cart** – Add, edit, and remove items  
- 🗃️ **Product Management** – Display and organize products  
- 📦 **MongoDB Integration** – Store users, products, and cart data  

---

## 🧰 Tech Stack

**Frontend:**  
- HTML  
- CSS  
- JavaScript  
- EJS (Embedded JavaScript Templates)

**Backend:**  
- Node.js  
- Express.js  
- Mongoose (for MongoDB)

**Database:**  
- MongoDB (Atlas or Localhost)

---

## 📦 NPM Packages Used

| Package | Description |
|----------|--------------|
| **express** | Web framework for Node.js to handle routing and server setup |
| **mongoose** | MongoDB object modeling tool |
| **dotenv** | Loads environment variables from `.env` file |
| **bcryptjs** | Used for password hashing and authentication |
| **express-session** | Session management for user login |
| **connect-mongodb-session** | Store sessions in MongoDB |
| **nodemailer** | Sending emails (for verification, reset password, etc.) |
| **nodemailer-sendgrid-transport** | SendGrid transport plugin for Nodemailer |
| **body-parser** | Parse incoming request bodies |
| **csurf** | CSRF protection middleware |
| **connect-flash** | Flash messages for success/error notifications |
| **multer** | For handling file uploads (product images, etc.) |
| **ejs** | Template engine for rendering dynamic pages |
| **path** | Node.js built-in module for path operations (no install needed) |
| **morgan** | HTTP request logger middleware (optional for debugging) |

---

## ⚙️ Installation & Setup

1️⃣ Clone the repository:
```bash
git clone https://github.com/M7aamed/E-Commerce.git

2️⃣ Navigate to the project folder:

cd E-Commerce

3️⃣ Install dependencies:

npm install

4️⃣ Create a .env file:

MONGO_URI=your_mongodb_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
PORT=3000

5️⃣ Run the project:

npm start

6️⃣ Open your browser and visit:

http://localhost:3000

💡Purpose

This project was created as a learning project to practice building a full-stack e-commerce application using Node.js, Express, and MongoDB.


👨‍💻 Developer

Mohammed Ashraf Mohammed
💬 Passionate about web development and full-stack projects.
📍 Minya, Egypt


⭐ Contribute

If you like this project, don’t forget to star ⭐ the repository or fork 🍴 it to build your own version!
