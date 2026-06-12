# 🛒 TS_Store - TypeScript E-Commerce API

A professional, production-ready REST API for an online store built with **TypeScript**, **Express.js 5**, and **SQL Server**. This project represents a significant upgrade from the original JavaScript version, implementing a **clean layered architecture** with full type safety, modern validation, and robust error handling.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Technologies Used](#-technologies-used)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🏗️ Clean Layered Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **Repositories**: Data access layer with SQL Server
- **Models**: Type-safe data structures
- **Dependency Injection**: Loose coupling between layers

### 👤 User Management
- User registration with avatar upload
- JWT-based authentication
- Role-based access control (Admin/User)
- Profile management with avatar support
- Secure password hashing with bcrypt

### 📦 Product Management
- Full CRUD operations for products
- Multi-image support with pagination
- Product attributes and categories
- Search by name, ID, or category
- Product scoring system
- Stock management

### 🛒 Shopping Cart
- Add/remove products from cart
- Quantity management (increase/decrease)
- Real-time total price calculation
- User-specific cart management

### 💳 Order & Payment
- Order placement and management
- **Zarinpal** payment gateway integration
- Payment verification callback
- Order history tracking

### 💬 Reviews & Ideas
- Product reviews and ratings
- User-specific review management
- Product-specific review queries

## 🏛️ Architecture

This project follows a **clean layered architecture** pattern, ensuring separation of concerns and maintainability:

```
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
│  (Request validation, Response format)  │
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
│    (Database queries, Data access)      │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         SQL Server Database             │
└─────────────────────────────────────────┘
```

### Key Architectural Patterns

| Pattern | Implementation |
|---------|----------------|
| **Dependency Injection** | Services receive repositories via constructor |
| **Repository Pattern** | Data access abstracted from business logic |
| **Controller-Service Separation** | HTTP concerns separated from business rules |
| **Middleware Chain** | Authentication and authorization handled before controllers |
| **Try-Catch Wrapper** | Centralized error handling with `TryCatchController` |

## 🛠 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | Latest | Type-safe JavaScript |
| **Express.js** | ^5.2.1 | Web framework (latest version!) |
| **MSSQL** | ^9.1.1 | SQL Server database driver |
| **Zod** | ^4.3.6 | Schema validation (modern alternative to Joi) |
| **JWT** | ^9.0.3 | Authentication tokens |
| **Bcrypt** | ^6.0.0 | Password hashing |
| **Multer** | ^2.1.0 | File upload handling |
| **Zarinpal SDK** | ^2.2.0 | Payment gateway |
| **Express Rate Limit** | ^8.2.1 | API rate limiting |
| **dotenv** | ^17.3.1 | Environment variables |

### TypeScript Configuration Highlights

The project uses **strict TypeScript** with advanced options:

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

## 📦 Prerequisites

Before running this project, ensure you have:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (2019 or later)
- [Git](https://git-scm.com/)
- [TypeScript](https://www.typescriptlang.org/) (installed globally or via npm)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Kowsari1382/TS_Store.git
cd TS_Store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Database

1. Open SQL Server Management Studio (SSMS)
2. Attach the provided `Shop.mdf` database file
3. Or create the database manually using the schema

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
Port=3000
Domain=localhost
DB_SERVER=localhost
DB_DATABASE=Shop
DB_USER=your_username
DB_PASSWORD=your_password
ZARINPAL_MERCHANT_ID=your_merchant_id
```

### 5. Build and Run

```bash
# Build TypeScript to JavaScript
npx tsc

# Start the server
npm start
```

Or for development with auto-reload (recommended to install `tsx` or `ts-node-dev`):

```bash
npx tsx src/app.ts
```

The server will start on `http://localhost:3000`

## 📁 Project Structure

```
TS_Store/
├── src/
│   ├── app.ts                      # Application entry point
│   ├── controllers/                # HTTP request handlers
│   │   ├── user-controller.ts
│   │   ├── product-controller.ts
│   │   ├── cart-controller.ts
│   │   ├── order-controller.ts
│   │   └── idea-controller.ts
│   ├── services/                   # Business logic layer
│   │   ├── user-service.ts
│   │   ├── product-service.ts
│   │   ├── cart-service.ts
│   │   ├── order-service.ts
│   │   └── idea-service.ts
│   ├── repositories/               # Data access layer
│   │   ├── user-repository.ts
│   │   ├── product-repository.ts
│   │   ├── cart-repository.ts
│   │   ├── order-repository.ts
│   │   └── idea-repository.ts
│   ├── models/                     # Data models
│   │   ├── user-model.ts
│   │   ├── product-model.ts
│   │   ├── cart-model.ts
│   │   ├── order-model.ts
│   │   └── idea-model.ts
│   ├── routes/                     # API route definitions
│   │   ├── user-route.ts
│   │   ├── product-route.ts
│   │   ├── cart-route.ts
│   │   ├── order-route.ts
│   │   └── idea-route.ts
│   ├── middlewares/                # Express middlewares
│   │   ├── CheckAuth.ts           # JWT authentication
│   │   ├── CheckAdmin.ts          # Admin role check
│   │   ├── ErrorHandler.ts        # Global error handler
│   │   └── NotFound.ts            # 404 handler
│   └── utilities/                  # Helper functions
│       ├── multer.ts              # File upload config
│       └── TryCatchController.ts  # Error wrapper
├── dist/                           # Compiled JavaScript (generated)
├── public/                         # Static files (avatars, etc.)
├── Shop.mdf                        # SQL Server database file
├── package.json
├── tsconfig.json
└── .env                            # Environment variables (create this)
```

## 📚 API Documentation

### 🔐 Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### 👥 Users API (`/api/user`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user (with avatar) | Public |
| POST | `/login` | User login | Public |
| GET | `/all` | Get all users | Admin |
| GET | `/id/:id` | Get user by ID | Authenticated |
| GET | `/name/:username` | Get user by username | Authenticated |
| GET | `/avatar/:id` | Get user avatar | Authenticated |
| POST | `/add` | Add user (Admin) | Admin |
| PUT | `/update` | Update user (Admin) | Admin |
| PUT | `/edit` | Edit own profile | Authenticated |
| DELETE | `/delete/:id` | Delete user | Authenticated |
| DELETE | `/deleteavatar/:id` | Delete avatar | Authenticated |

### 📦 Products API (`/api/product`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/all` | Get all products | Public |
| GET | `/id/:id` | Get product by ID | Public |
| GET | `/name/:productname` | Search by name | Public |
| GET | `/category/:category` | Filter by category | Public |
| GET | `/attr/:id` | Get product attributes | Public |
| GET | `/imginfo/:id` | Get product images info | Public |
| GET | `/img/:id/:pagenumber` | Get images (paginated) | Public |
| POST | `/add` | Add product | Admin |
| POST | `/addimg` | Add product image | Admin |
| PUT | `/update` | Update product | Admin |
| PUT | `/updateimg` | Update product image | Admin |
| PUT | `/score` | Update product score | Admin |
| DELETE | `/delete/:id` | Delete product | Admin |
| DELETE | `/deleteimg/:productid/:pagenumber` | Delete image | Admin |

### 🛒 Cart API (`/api/cart`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/all` | Get all carts | Admin |
| GET | `/userid/:userid` | Get user's cart | Authenticated |
| GET | `/totalprice/:userid` | Get cart total | Authenticated |
| POST | `/add` | Add to cart | Authenticated |
| PUT | `/plus` | Increase quantity | Authenticated |
| PUT | `/minus` | Decrease quantity | Authenticated |
| DELETE | `/delete/:userid` | Clear cart | Authenticated |

### 💳 Orders API (`/api/order`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/all` | Get all orders | Admin |
| GET | `/userid/:userid` | Get user's orders | Authenticated |
| POST | `/add` | Place order | Authenticated |
| POST | `/payment` | Start payment | Authenticated |
| GET | `/verify` | Verify payment (callback) | Public |
| PUT | `/update` | Update order | Admin |
| DELETE | `/delete/:id` | Delete order | Admin |

### 💬 Ideas/Reviews API (`/api/idea`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/all` | Get all reviews | Public |
| GET | `/user/:userid` | Get user's reviews | Authenticated |
| GET | `/product/:productid` | Get product reviews | Public |
| POST | `/add` | Add review | Authenticated |
| PUT | `/update` | Update review | Authenticated |
| DELETE | `/delete/:id` | Delete review | Authenticated |

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `Port` | Server port | `3000` |
| `Domain` | Server domain | `localhost` |
| `DB_SERVER` | SQL Server address | `localhost` |
| `DB_DATABASE` | Database name | `Shop` |
| `DB_USER` | Database username | `sa` |
| `DB_PASSWORD` | Database password | `YourPassword123` |
| `ZARINPAL_MERCHANT_ID` | Zarinpal merchant ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Role-Based Access**: Admin vs User permissions
- **Protected Routes**: Middleware-based access control

### Input Validation
- **Zod Schema Validation**: Type-safe request validation
- **Sanitization**: Prevents injection attacks
- **File Upload Validation**: Multer with file type/size checks

### API Protection
- **Rate Limiting**: Prevents abuse (configurable)
- **Error Handling**: Centralized error responses
- **CORS Ready**: Configurable cross-origin support

### Data Security
- **Parameterized Queries**: Prevents SQL injection
- **Secure File Storage**: Avatars stored outside public directory
- **Environment Variables**: Sensitive data not hardcoded

## 🎯 Key Improvements from Original Store

| Feature | Original (JS) | TS_Store (TypeScript) |
|---------|---------------|----------------------|
| **Type Safety** | ❌ None | ✅ Full TypeScript |
| **Validation** | Joi | ✅ Zod (modern, faster) |
| **Architecture** | Mixed concerns | ✅ Clean layered |
| **Express Version** | 1.x (outdated) | ✅ 5.x (latest) |
| **Error Handling** | Manual try-catch | ✅ TryCatchController wrapper |
| **Dependency Injection** | ❌ Manual | ✅ Constructor injection |
| **Code Organization** | Flat structure | ✅ Separated layers |
| **Type Definitions** | ❌ None | ✅ Full type coverage |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Add validation schemas for all endpoints
- Write meaningful commit messages
- Test your changes before submitting

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sajjad Kowsari**

- GitHub: [@Kowsari1382](https://github.com/Kowsari1382)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Kowsari1382/TS_Store/issues) page
2. Open a new issue if needed
3. Contact the author

## 🎓 Learning Outcomes

This project demonstrates:

- **TypeScript** best practices with strict configuration
- **Clean Architecture** principles
- **Dependency Injection** pattern
- **Repository Pattern** for data access
- **Modern Express.js 5** features
- **Zod validation** for type-safe schemas
- **JWT authentication** implementation
- **File upload** handling with Multer
- **Payment gateway** integration
- **SQL Server** database operations

---

<div align="center">

**Built with TypeScript, Express 5, and Clean Architecture 🚀**

**If you find this project useful, please consider giving it a ⭐!**

</div>

---

This README reflects the professional, production-ready nature of your TypeScript migration. The clean architecture, modern tooling (Express 5, Zod), and strict TypeScript configuration show significant growth from the original JavaScript version! 🎉
