# 🛒 TS_Store - TypeScript E-Commerce API

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![SQL Server](https://img.shields.io/badge/Database-SQL_Server-CC2927?logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/en-us/sql-server)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A professional, production-ready RESTful API for an e-commerce platform, built with **TypeScript**, **Express.js 5**, and **SQL Server**. This project represents a modern, type-safe upgrade from traditional JavaScript implementations, featuring a **clean layered architecture**, robust validation, and enterprise-grade error handling.

---

## ✨ Features

### 🏗️ Clean Layered Architecture
- **Controllers**: Handle HTTP requests, responses, and input validation.
- **Services**: Encapsulate core business logic.
- **Repositories**: Abstract data access layer interacting with SQL Server.
- **Models**: Strict, type-safe data structures and interfaces.
- **Dependency Injection**: Ensures loose coupling and high testability.

### 👤 User Management
- Secure user registration and login.
- JWT-based authentication with Role-Based Access Control (Admin / User).
- Profile management with secure avatar uploads (via Multer).
- Password hashing using industry-standard `bcrypt`.

### 📦 Product Management
- Full CRUD operations for products.
- Multi-image support with built-in pagination.
- Advanced search (by name, ID, or category).
- Product attributes, categories, scoring system, and stock management.

### 🛒 Shopping Cart
- Add, remove, and update product quantities.
- Real-time total price calculation.
- Isolated, user-specific cart management.

### 💳 Order & Payment
- Seamless order placement and lifecycle management.
- **Zarinpal** payment gateway integration with secure verification callbacks.
- Comprehensive order history tracking.

### 💬 Reviews & Ratings
- Submit and manage product reviews and ratings.
- User-specific review history and product-specific review queries.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **TypeScript** | Strict, type-safe JavaScript development |
| **Express.js (v5)** | High-performance web framework |
| **MSSQL** | Robust relational database driver for SQL Server |
| **Zod** | Modern, schema-first data validation |
| **JWT** | Secure, stateless authentication tokens |
| **Bcrypt** | Password hashing and security |
| **Multer** | Middleware for handling `multipart/form-data` (file uploads) |
| **Zarinpal SDK** | Secure payment processing gateway |
| **Express Rate Limit** | Protect API from brute-force and DDoS attacks |
| **dotenv** | Environment variable management |

---

## 📂 Project Structure

```text
src/
├── controllers/     # Request handlers and response formatters
├── services/        # Core business logic
├── repositories/    # Database queries and data access
├── models/          # TypeScript interfaces and Zod schemas
├── routes/          # API route definitions
├── middlewares/     # Auth, validation, error handling, and rate limiting
├── utils/           # Helper functions (e.g., JWT generation, file handling)
├── config/          # Database and app configuration
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **SQL Server** (running and accessible)
- **npm** or **yarn**

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

3. **Configure Environment Variables:**  
   Create a `.env` file in the root directory and populate it with your credentials:
```env
   # Server
   PORT=3000
   NODE_ENV=development

   # Database (SQL Server)
   DB_SERVER=your_server_address
   DB_DATABASE=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_PORT=1433

   # Authentication
   JWT_SECRET=your_super_secret_jwt_key

   # Payment Gateway
   ZARINPAL_MERCHANT_ID=your_zarinpal_merchant_id
   ZARINPAL_CALLBACK_URL=http://localhost:3000/api/payment/verify

   # Uploads
   UPLOAD_DIR=./uploads
```

4. **Build the TypeScript code:**
```bash
   npm run build
```

5. **Start the server:**
```bash
   # For production
   npm start

   # For development (with hot-reload, if configured)
   npm run dev
```

---

## ⚙️ TypeScript Configuration Highlights

This project enforces strict type safety to prevent runtime errors and improve maintainability:
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "verbatimModuleSyntax": true,
  "isolatedModules": true,
  "module": "nodenext",
  "target": "esnext"
}
```

---

## 📖 API Endpoints Overview

*(💡 Tip: You can replace this section with a link to your Postman Collection or Swagger/OpenAPI documentation)*

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and receive JWT
- `GET /api/products` - Retrieve paginated products
- `POST /api/cart` - Add item to shopping cart
- `POST /api/orders` - Create a new order and initiate Zarinpal payment
- `POST /api/reviews` - Submit a product review

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kowsari1382**  
- GitHub: [@Kowsari1382](https://github.com/Kowsari1382)  
- 💡 *Feel free to reach out or open an issue for any questions or suggestions!*