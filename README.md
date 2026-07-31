# 🛒 TS_Store - TypeScript E-Commerce API

A professional, production-ready RESTful API for an online store, built with **TypeScript**, **Express.js 5**, and **SQL Server**. This project represents a significant architectural upgrade from traditional JavaScript implementations, featuring a clean layered architecture, full type safety, modern schema validation, and robust error handling.

---

## ✨ Features

### 🏗️ Clean Layered Architecture
- **Controllers**: Handle HTTP requests and responses cleanly.
- **Services**: Encapsulate core business logic.
- **Repositories**: Manage data access and SQL Server interactions.
- **Models**: Define strict, type-safe data structures.
- **Dependency Injection**: Ensures loose coupling and high testability across layers.

### 👤 User Management
- Secure user registration with avatar upload support.
- JWT-based authentication and session management.
- Role-based access control (Admin / User).
- Secure password hashing using `bcrypt`.

### 📦 Product Management
- Full CRUD operations for products.
- Multi-image support with pagination.
- Product attributes, categories, and a scoring/rating system.
- Advanced search capabilities (by name, ID, or category).
- Real-time stock management.

### 🛒 Shopping Cart
- Add, remove, and update product quantities in the cart.
- Real-time total price calculation.
- User-specific cart persistence.

### 💳 Order & Payment
- Seamless order placement and management.
- **Zarinpal** payment gateway integration with secure verification callbacks.
- Comprehensive order history tracking.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | Latest | Type-safe JavaScript development |
| **Express.js** | ^5.2.1 | Modern, fast, and minimal web framework |
| **MSSQL** | ^9.1.1 | SQL Server database driver |
| **Zod** | ^4.3.6 | Schema validation (modern, type-safe alternative to Joi) |
| **JWT** | ^9.0.3 | Secure authentication tokens |
| **Bcrypt** | ^6.0.0 | Password hashing |
| **Multer** | ^2.1.0 | Middleware for handling `multipart/form-data` (file uploads) |
| **Zarinpal SDK** | ^2.2.0 | Payment gateway integration |
| **Express Rate Limit** | ^8.2.1 | API rate limiting and basic DDoS protection |
| **dotenv** | ^17.3.1 | Environment variable management |

---

## 📁 Project Structure

```text
TS_Store/
├── src/
│   ├── app.ts                      # Application entry point & Express setup
│   ├── controllers/                # HTTP request handlers
│   ├── services/                   # Business logic layer
│   ├── repositories/               # Data access layer (SQL queries)
│   ├── models/                     # TypeScript interfaces and data models
│   ├── routes/                     # API route definitions
│   ├── middlewares/                # Custom Express middlewares (Auth, Error Handling, etc.)
│   └── utilities/                  # Helper functions (Multer config, TryCatch wrappers)
├── dist/                           # Compiled JavaScript output (generated)
├── public/                         # Static files (e.g., uploaded avatars)
├── Shop.mdf                        # SQL Server database file (for local dev)
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── .env                            # Environment variables (create this file)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or Azure SQL)
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

4. **Compile TypeScript (optional, if not using `ts-node` in dev):**
```bash
   npm run build
```

5. **Start the development server:**
```bash
   npm run dev
```
   *(Use `npm start` for production mode)*

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (SQL Server)
DB_SERVER=localhost
DB_DATABASE=Shop
DB_USER=sa
DB_PASSWORD=your_strong_password
DB_PORT=1433

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Zarinpal Payment Gateway
ZARINPAL_MERCHANT_ID=your_zarinpal_merchant_id
ZARINPAL_CALLBACK_URL=http://localhost:3000/api/orders/verify

# Uploads
MAX_FILE_SIZE=5242880 # 5MB in bytes
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/register` | Register a new user | No |
| `POST` | `/api/users/login` | Authenticate user & get JWT | No |
| `GET`  | `/api/products` | Get all products (with pagination/search) | No |
| `GET`  | `/api/products/:id` | Get a single product by ID | No |
| `POST` | `/api/cart/add` | Add product to shopping cart | Yes |
| `POST` | `/api/orders/create` | Create a new order and initiate payment | Yes |
| `POST` | `/api/orders/verify` | Zarinpal payment verification callback | No |

*(For a complete API reference, please refer to the Postman collection or Swagger documentation if attached to the repo.)*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kowsari1382**  
🔗 [GitHub Profile](https://github.com/Kowsari1382)

If you find this project helpful, please consider giving it a ⭐️ on GitHub!