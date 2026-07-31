# TS_Store

A production-ready, type-safe RESTful API for an e-commerce platform, built with **TypeScript**, **Express.js 5**, and **Microsoft SQL Server**. Designed with **Clean Architecture** principles, it ensures a strict separation of concerns, robust dependency injection, and modern data validation.

## 🚀 Key Features

- **Clean Layered Architecture**: Strict separation between Routes, Controllers, Services, and Repositories.
- **Full Type Safety**: Built with strict TypeScript configurations (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`).
- **Dependency Injection**: Loosely coupled components (repositories injected into services, services into controllers) for better testability and maintainability.
- **Modern Validation**: Utilizes **Zod** for runtime schema validation and static type inference.
- **Secure Authentication**: JWT-based auth with `bcrypt` password hashing and role-based access control (Admin/User).
- **Payment Integration**: Seamless integration with the **Zarinpal** payment gateway for order processing.
- **Performance & Security**: Global express rate limiting, centralized error handling, and parameterized SQL queries to prevent injection attacks.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js (ES Modules) |
| **Framework** | Express.js v5 |
| **Language** | TypeScript (Strict Mode) |
| **Database** | Microsoft SQL Server (`mssql`) |
| **Validation** | Zod |
| **Security** | JWT, Bcrypt, Express Rate Limit |
| **File Upload** | Multer |
| **Payment** | Zarinpal Node SDK |

## 🏗️ Architecture

The project follows a dependency-injected, layered architecture pattern:

```text
HTTP Request → Route → Controller → Service → Repository → Database
                   ↑           ↑          ↑
                (Injected Dependencies)
```

- **Routes**: Define API endpoints and bind them to controller methods.
- **Controllers**: Handle the HTTP request/response lifecycle, extract data, and delegate to services.
- **Services**: Contain core business logic and orchestrate multiple repositories if needed.
- **Repositories**: Abstract all database interactions and raw SQL queries.
- **Middlewares**: Handle cross-cutting concerns like authentication, authorization, rate limiting, and global error catching.

## 📦 Prerequisites

- Node.js (v18 or higher)
- Microsoft SQL Server (2019 or later)
- npm or yarn

## ⚙️ Installation & Setup

1. **Clone the repository**:
```bash
   git clone https://github.com/Kowsari1382/TS_Store.git
   cd TS_Store
```

2. **Install dependencies**:
```bash
   npm install
```

3. **Configure Environment Variables**:  
   Create a `.env` file in the root directory and add the following:
```env
   Port=3000
   Domain=localhost
   DB_SERVER=localhost
   DB_DATABASE=Shop
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   ZARINPAL_MERCHANT_ID=your_zarinpal_merchant_id
```

4. **Database Setup**:  
   Attach the provided `Shop.mdf` file to your SQL Server instance, or run the necessary schema scripts to create the `Shop` database manually.

5. **Build and Run**:
```bash
   # Compile TypeScript to JavaScript
   npx tsc

   # Start the production server
   npm start
```
   *(For development with hot-reloading, it is recommended to use `tsx`: `npx tsx src/app.ts`)*

## 📁 Project Structure

```text
TS_Store/
├── src/
│   ├── app.ts                 # Application entry point & middleware setup
│   ├── controllers/           # HTTP request handlers
│   ├── services/              # Business logic and orchestration
│   ├── repositories/          # Data access layer (SQL queries)
│   ├── routes/                # API route definitions
│   ├── models/                # TypeScript interfaces and Zod schemas
│   ├── middlewares/           # Auth, rate limiting, and error handling
│   └── utilities/             # Helper functions (e.g., TryCatch wrapper)
├── public/                    # Static assets (e.g., uploaded avatars)
├── Shop.mdf                   # SQL Server database file
├── package.json
├── tsconfig.json              # Strict TypeScript configuration
└── .env                       # Environment variables (not in VCS)
```

## 🔌 API Overview

All protected routes require a Bearer token in the headers: `Authorization: Bearer <token>`

| Module | Base Route | Description |
|--------|------------|-------------|
| **Users** | `/api/user` | Registration, login, profile management, and admin user operations. |
| **Products** | `/api/product` | CRUD operations, image management, categorization, and scoring. |
| **Cart** | `/api/cart` | Add/remove items, quantity adjustments, and total price calculation. |
| **Orders** | `/api/order` | Order placement, history tracking, and Zarinpal payment verification. |
| **Reviews** | `/api/idea` | Submit, update, and retrieve product reviews and ratings. |

*(For detailed endpoint specifications, refer to the controller files or test with an API client like Postman/Insomnia.)*

## 🔒 Security Highlights

- **Strict Input Validation**: All incoming payloads are validated against Zod schemas before processing.
- **SQL Injection Prevention**: All database queries use parameterized inputs via the `mssql` driver.
- **Rate Limiting**: Global rate limiter configured to mitigate brute-force and DDoS attempts.
- **Centralized Error Handling**: Custom `ErrorHandler` middleware ensures consistent JSON error responses without leaking sensitive stack traces.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Ensure your code passes all TypeScript strict checks (`npx tsc --noEmit`).
4. Submit a Pull Request with a clear description of your changes.

## 📄 License

This project is licensed under the **ISC License**.

---
Built with ❤️ by [Sajjad Kowsari](https://github.com/Kowsari1382)