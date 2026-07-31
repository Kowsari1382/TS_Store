# 🛒 TS_Store - TypeScript E-Commerce API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/en-us/sql-server)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A professional, production-ready REST API for an online store built with **TypeScript**, **Express.js 5**, and **SQL Server**. This project represents a significant upgrade from traditional JavaScript implementations, featuring a **clean layered architecture**, full type safety, modern schema validation, and robust error handling.

## ✨ Features

- 🏗️ **Clean Layered Architecture**: Strict separation of concerns with Controllers, Services, Repositories, and Models, utilizing Dependency Injection for loose coupling.
- 👤 **User Management**: Secure registration/login, JWT-based authentication, role-based access control (Admin/User), and profile management with avatar uploads.
- 📦 **Product Management**: Full CRUD operations, multi-image support, pagination, product attributes, categories, advanced search, and stock management.
- 🛒 **Shopping Cart**: Add/remove products, quantity management, and real-time total price calculation per user.
- 💳 **Order & Payment**: Seamless order placement and tracking, integrated with the **Zarinpal** payment gateway (including verification callbacks).
- 💬 **Reviews & Ratings**: Product-specific review system with user management and rating queries.
- 🛡️ **Security & Performance**: Password hashing (bcrypt), API rate limiting, global error handling, and modern schema validation using **Zod**.

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **TypeScript** | Type-safe JavaScript development |
| **Express.js (v5)** | High-performance web framework |
| **MSSQL** | SQL Server database driver |
| **Zod** | Modern, type-safe schema validation |
| **JWT** | Secure authentication tokens |
| **Bcrypt** | Password hashing |
| **Multer** | Middleware for handling `multipart/form-data` (file uploads) |
| **Zarinpal SDK** | Secure payment gateway integration |
| **Express Rate Limit** | API rate limiting and DDoS protection |
| **dotenv** | Environment variable management |

## 📁 Project Structure

```text
TS_Store/
├── src/
│   ├── app.ts                      # Application entry point
│   ├── controllers/                # HTTP request/response handlers
│   ├── services/                   # Core business logic
│   ├── repositories/               # Data access layer (SQL queries)
│   ├── models/                     # Type-safe data structures (Interfaces/Types)
│   ├── routes/                     # API route definitions
│   ├── middlewares/                # Auth, Admin check, Error handling, 404
│   └── utilities/                  # Helper functions (Multer config, TryCatch wrappers)
├── dist/                           # Compiled JavaScript output (generated)
├── public/                         # Static assets (e.g., user avatars)
├── Shop.mdf                        # SQL Server database file (for local dev)
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── .env                            # Environment variables (not committed)
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Local or remote instance)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/Kowsari1382/TS_Store.git
   cd TS_Store
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure it based on the example below.

4. **Compile TypeScript (optional, if not using `ts-node`):**
```bash
   npm run build
```

5. **Start the development server:**
```bash
   npm run dev
   # or npm start for production
```

## ⚙️ Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (SQL Server)
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=Shop
DB_USER=your_sql_username
DB_PASSWORD=your_sql_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Zarinpal Payment Gateway
ZARINPAL_MERCHANT_ID=your_zarinpal_merchant_id
ZARINPAL_CALLBACK_URL=http://localhost:3000/api/orders/verify

# Uploads
MAX_FILE_SIZE=5242880 # 5MB in bytes
```

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/users/register` | Register a new user | Public |
| `POST` | `/api/users/login` | Authenticate and get JWT | Public |
| `GET` | `/api/products` | Get all products (with pagination/search) | Public |
| `POST` | `/api/products` | Create a new product | Admin Only |
| `GET` | `/api/cart` | Get current user's shopping cart | User/Admin |
| `POST` | `/api/cart` | Add item to cart | User/Admin |
| `POST` | `/api/orders` | Place a new order and initiate payment | User/Admin |
| `POST` | `/api/orders/verify` | Zarinpal payment verification callback | Public/System |
| `GET` | `/api/ideas/:productId` | Get reviews for a specific product | Public |

*(For a complete API reference, please refer to the Postman collection or Swagger documentation if available.)*

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kowsari1382**  
- GitHub: [@Kowsari1382](https://github.com/Kowsari1382)

---

*If you find this project helpful, please consider giving it a ⭐️ on GitHub!*