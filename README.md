# 🛒 TS_Store - TypeScript E-Commerce API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/en-us/sql-server)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](LICENSE)

A professional, production-ready RESTful API for an e-commerce platform, built with **TypeScript**, **Express.js 5**, and **SQL Server**. This project implements a **clean layered architecture** with full type safety, modern schema validation (Zod), robust error handling, and secure authentication.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏛️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Installation & Setup](#-installation--setup)
- [🔧 Environment Variables](#-environment-variables)
- [📚 API Endpoints Overview](#-api-endpoints-overview)
- [📁 Project Structure](#-project-structure)
- [🔒 Security Features](#-security-features)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)

---

## ✨ Features

- **🏗️ Clean Layered Architecture**: Strict separation of Controllers, Services, Repositories, and Models for maximum maintainability.
- **👤 User Management**: Registration, login, JWT-based authentication, role-based access control (Admin/User), and avatar uploads.
- **📦 Product Management**: Full CRUD operations, multi-image support with pagination, categories, attributes, and stock management.
- **🛒 Shopping Cart**: Add/remove items, quantity management, and real-time total price calculation.
- **💳 Order & Payment**: Seamless order placement with **Zarinpal** payment gateway integration and verification callbacks.
- **💬 Reviews & Ratings**: User-specific product reviews and rating management.

---

## 🏛️ Architecture

The project follows a **Clean Architecture** pattern to ensure maintainability, testability, and separation of concerns:

```text
HTTP Request 
    │
    ▼
Middleware Layer (Auth, Role Check, Rate Limit, Zod Validation)
    │
    ▼
Controller Layer (Request/Response handling, HTTP status codes)
    │
    ▼
Service Layer (Core business logic and orchestration)
    │
    ▼
Repository Layer (Data access and SQL queries)
    │
    ▼
SQL Server Database
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Strict type safety and modern JavaScript features |
| **Express.js 5** | Fast, minimalist, and latest-generation web framework |
| **MSSQL** | Robust relational database management |
| **Zod** | Schema declaration and validation (TypeScript-first alternative to Joi) |
| **JWT & Bcrypt** | Secure stateless authentication and password hashing |
| **Multer** | Middleware for handling `multipart/form-data` (file uploads) |
| **Zarinpal SDK** | Secure and reliable payment gateway integration |
| **Express Rate Limit** | API abuse and brute-force prevention |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (2019 or later)
- [Git](https://git-scm.com/)

---

## 🚀 Installation & Setup

1. **Clone the repository**:
```bash
   git clone https://github.com/Kowsari1382/TS_Store.git
   cd TS_Store
```

2. **Install dependencies**:
```bash
   npm install
```

3. **Set up the Database**:
   - Open SQL Server Management Studio (SSMS).
   - Attach the provided `Shop.mdf` file located in the root directory, or create the database manually using the schema.

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory and add the following variables:
```env
     PORT=3000
     DOMAIN=localhost
     DB_SERVER=localhost
     DB_DATABASE=Shop
     DB_USER=your_db_username
     DB_PASSWORD=your_db_password
     ZARINPAL_MERCHANT_ID=your_zarinpal_merchant_id
     JWT_SECRET=your_super_secret_jwt_key
```

5. **Build and Run**:
```bash
   # Compile TypeScript to JavaScript
   npx tsc

   # Start the production server
   npm start
```
   *(💡 For development with auto-reload, it is recommended to use: `npx tsx src/app.ts` or `npx ts-node-dev src/app.ts`)*

---

## 📚 API Endpoints Overview

| Module | Base Route | Description |
|--------|------------|-------------|
| **Users** | `/api/user` | Registration, login, profile management, admin user operations |
| **Products** | `/api/product` | CRUD operations, image management, search, and filtering |
| **Cart** | `/api/cart` | Add/remove items, update quantities, get total price |
| **Orders** | `/api/order` | Place orders, payment initiation, Zarinpal verification |
| **Reviews** | `/api/idea` | Submit, update, and retrieve product reviews/ratings |

> 🔐 **Note**: Most endpoints require a valid JWT token in the `Authorization: Bearer <token>` header. Admin-only routes strictly require the `Admin` role.

---

## 📁 Project Structure

```text
TS_Store/
├── src/
│   ├── app.ts                  # Application entry point & Express setup
│   ├── controllers/            # HTTP request/response handlers
│   ├── services/               # Business logic and orchestration layer
│   ├── repositories/           # Data access layer (SQL queries)
│   ├── models/                 # TypeScript interfaces and data models
│   ├── routes/                 # API route definitions
│   ├── middlewares/            # Auth, validation, error handling, rate limiting
│   └── utilities/              # Helper functions (Multer config, TryCatch wrapper)
├── public/                     # Static assets (e.g., uploaded avatars)
├── Shop.mdf                    # SQL Server database file
├── package.json
├── tsconfig.json               # Strict TypeScript configuration
└── .env                        # Environment variables (not committed to Git)
```

---

## 🔒 Security Features

- **Authentication**: Stateless JWT-based authentication with secure header validation.
- **Password Security**: Passwords are hashed using `bcrypt` with configurable salt rounds.
- **Input Validation**: Strict request validation using **Zod** schemas to prevent malformed data and injection attacks.
- **Rate Limiting**: Protects sensitive endpoints (like login) from brute-force and DDoS attacks.
- **Error Handling**: Centralized global error handler (`TryCatchController`) to prevent sensitive stack traces from leaking to the client.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn and build. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Sajjad Kowsari**  
- GitHub: [@Kowsari1382](https://github.com/Kowsari1382)

---

## 📝 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ using TypeScript, Express 5, and Clean Architecture</sub>
  <br>
  <strong>If you found this project helpful, please consider giving it a ⭐!</strong>
</div>