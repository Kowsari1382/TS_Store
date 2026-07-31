# 🛒 TS_Store - E-commerce API with TypeScript & Express.js

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/en-us/sql-server)
[![License](https://img.shields.io/badge/License-ISC-green.svg?style=for-the-badge)](LICENSE)

A professional, secure, and production-ready RESTful API for an e-commerce platform, built with **TypeScript**, **Express.js 5**, and **SQL Server**. This project is a modern, robust rewrite of classic JavaScript implementations, featuring **Clean Layered Architecture**, full type safety, modern schema validation, and powerful error handling.

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🏛️ Project Architecture](#️-project-architecture)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Installation & Setup](#-installation--setup)
- [📁 Project Structure](#-project-structure)
- [📚 API Documentation](#-api-documentation)
- [🔒 Security Features](#-security-features)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ✨ Features

### 🏗️ Clean Layered Architecture
- **Controllers**: Handle HTTP requests and responses.
- **Services**: Encapsulate core business logic.
- **Repositories**: Manage data access and database queries.
- **Models**: Strict, type-safe data structures.
- **Dependency Injection**: Decoupled layers for maximum testability and maintainability.

### 👤 User Management
- User registration with avatar upload support.
- Secure JWT-based authentication.
- Role-Based Access Control (RBAC) for Admin/User roles.
- Profile management with avatar updates.
- Secure password hashing using `bcrypt`.

### 📦 Product Management
- Full CRUD operations for products.
- Support for multiple product images with pagination.
- Product attributes, categories, and inventory/stock management.
- Advanced search by name, ID, or category.
- Rating and review system.

### 🛒 Shopping Cart
- Add/remove products to/from the cart.
- Dynamic quantity management (increment/decrement).
- Real-time total price calculation.
- User-specific cart isolation.

### 💳 Orders & Payment
- Comprehensive order creation and management.
- Seamless integration with the **Zarinpal** payment gateway.
- Payment callback verification.
- Order history tracking for users.

### 💬 Comments & Reviews
- Submit ratings and reviews for products.
- User-owned review management.
- Fetch product-specific reviews.

---

## 🏛️ Project Architecture

This project strictly follows the **Clean Layered Architecture** pattern to ensure Separation of Concerns (SoC) and high code maintainability:

```text
┌─────────────────────────────────────────┐
│           HTTP Request                  │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         Middleware Layer                │
│  (CheckAuth, CheckAdmin, RateLimit)     │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         Controller Layer                │
│  (Request validation, Response formatting)│
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│          Service Layer                  │
│      (Business Logic, Validation)       │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│        Repository Layer                 │
│    (Database Queries, Data Access)      │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         SQL Server Database             │
└─────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **TypeScript** | Latest | Typed JavaScript for safety and scalability |
| **Express.js** | ^5.x | Modern, minimal web framework |
| **MSSQL** | ^9.x | Official Microsoft SQL Server driver for Node.js |
| **Zod** | ^4.x | High-performance schema validation (modern alternative to Joi) |
| **JWT** | ^9.x | JSON Web Tokens for stateless authentication |
| **Bcrypt** | ^6.x | Secure password hashing |
| **Multer** | ^2.x | Middleware for handling `multipart/form-data` (file uploads) |
| **Zarinpal SDK** | ^2.x | Official SDK for Zarinpal payment gateway |
| **Express Rate Limit** | ^8.x | API rate limiting to prevent abuse |
| **dotenv** | ^17.x | Environment variable management |

---

## 📦 Prerequisites

Ensure you have the following installed on your system before running the project:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server) (2019 or higher)
- [Git](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Kowsari1382/TS_Store.git
cd TS_Store
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
1. Open SQL Server Management Studio (SSMS).
2. Attach the provided database file (`Shop.mdf`) to your local SQL Server instance.
3. *(Optional)* You can also create the database manually using the provided schema scripts.

### 4. Environment Variables
Create a `.env` file in the root directory and configure it with your local settings:
```env
PORT=3000
DOMAIN=localhost
DB_SERVER=localhost
DB_DATABASE=Shop
DB_USER=your_sql_username
DB_PASSWORD=your_sql_password
ZARINPAL_MERCHANT_ID=your_zarinpal_merchant_id
```

### 5. Build and Run
```bash
# Compile TypeScript to JavaScript
npx tsc

# Start the production server
npm start
```
> 💡 **Development Tip:** For auto-reloading during development, use `tsx` or `ts-node-dev`:
> ```bash
> npx tsx src/app.ts
> ```

The server will be running at `http://localhost:3000`.

---

## 📁 Project Structure

```text
TS_Store/
├── src/
│   ├── app.ts                      # Main application entry point
│   ├── controllers/                # HTTP request handlers
│   ├── services/                   # Business logic layer
│   ├── repositories/               # Data access layer (SQL queries)
│   ├── models/                     # Data structures (Types/Interfaces)
│   ├── routes/                     # API route definitions
│   ├── middlewares/                # Auth, Error Handling, Rate Limiting
│   └── utilities/                  # Helper functions (Multer config, TryCatch)
├── dist/                           # Compiled JavaScript output
├── public/                         # Static assets (e.g., uploaded avatars)
├── Shop.mdf                        # SQL Server database file
├── package.json
├── tsconfig.json
└── .env                            # Environment variables (create this)
```

---

## 📚 API Documentation

All protected routes require a valid JWT token in the `Authorization` header:
```http
Authorization: Bearer <your-jwt-token>
```

### 👥 Users (`/api/user`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/register` | Register a new user (with avatar) | Public |
| `POST` | `/login` | User login | Public |
| `GET` | `/all` | Get list of all users | Admin |
| `GET` | `/id/:id` | Get user details by ID | Authenticated |
| `PUT` | `/edit` | Update user profile | Authenticated |

### 📦 Products (`/api/product`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/all` | Get all products (with pagination) | Public |
| `GET` | `/name/:productname` | Search products by name | Public |
| `POST` | `/add` | Add a new product | Admin |
| `PUT` | `/update` | Update product details | Admin |
| `DELETE` | `/delete/:id` | Delete a product | Admin |

### 🛒 Shopping Cart (`/api/cart`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/userid/:userid` | Get user's shopping cart | Authenticated |
| `POST` | `/add` | Add product to cart | Authenticated |
| `PUT` | `/plus` | Increase product quantity in cart | Authenticated |
| `PUT` | `/minus` | Decrease product quantity in cart | Authenticated |

### 💳 Orders (`/api/order`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/userid/:userid` | Get user's order history | Authenticated |
| `POST` | `/add` | Create a new order | Authenticated |
| `POST` | `/payment` | Initiate Zarinpal payment | Authenticated |
| `GET` | `/verify` | Verify payment callback | Public |

---

## 🔒 Security Features

- **Authentication & Authorization**: JWT-based stateless auth, `bcrypt` password hashing, and strict Role-Based Access Control (RBAC).
- **Input Validation**: `Zod` schema validation on all incoming requests to prevent injection attacks and ensure data integrity.
- **API Protection**: Express Rate Limiting to mitigate brute-force and DDoS attempts, coupled with centralized error handling (`TryCatchController`).
- **Data Security**: Parameterized SQL queries to completely prevent SQL Injection. File uploads are strictly validated and stored securely.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is distributed under the **ISC License**. See the [LICENSE](LICENSE) file for more information.

---

## 👨‍💻 Author

**Sajjad Kowsari**  
- GitHub: [@Kowsari1382](https://github.com/Kowsari1382)

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Kowsari1382/TS_Store/issues) tab.
2. Open a new issue with a detailed description of the problem.
3. Feel free to reach out to the author directly.

---

<p align="center">
  <b>Built with ❤️, TypeScript, Express 5, and Clean Architecture 🚀</b><br>
  <i>If you found this project helpful, please consider giving it a ⭐!</i>
</p>
