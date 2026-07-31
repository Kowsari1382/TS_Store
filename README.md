# 🛒 TS_Store - TypeScript E-Commerce API

A modern, production-ready **REST API** for an online store built with **TypeScript**, **Express.js 5**, and **SQL Server**. 

This project is a complete rewrite and significant upgrade of a previous JavaScript version, featuring **clean layered architecture**, full type safety, robust validation, and enterprise-grade practices.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQL Server](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)

## ✨ Features

### 🏗️ Architecture
- **Clean Layered Architecture** (Controller → Service → Repository)
- **Dependency Injection** for loose coupling
- **Repository Pattern** for data access
- Centralized error handling and middleware protection

### 👤 User Management
- User registration with avatar upload
- JWT Authentication + Refresh Token support (planned)
- Role-based access control (**Admin** / **User**)
- Secure password hashing with **bcrypt**
- Profile management

### 📦 Product Management
- Full CRUD operations
- Multi-image support with pagination
- Categories, attributes, and search
- Product scoring/rating system
- Stock management

### 🛒 Shopping Cart
- Add/remove items
- Quantity management
- Real-time total calculation
- User-specific carts

### 💳 Orders & Payment
- Order creation and history
- **Zarinpal** payment gateway integration
- Payment verification callback

### 💬 Reviews
- Product reviews and ratings
- User-specific and product-specific queries

## 🛠 Technologies Used

| Technology          | Version     | Purpose                     |
|---------------------|-------------|-----------------------------|
| TypeScript          | Latest      | Type safety                 |
| Express.js          | ^5.2.1      | Web framework               |
| MSSQL               | ^9.1.1      | SQL Server driver           |
| Zod                 | ^4.3.6      | Schema validation           |
| JWT                 | ^9.0.3      | Authentication              |
| Bcrypt              | ^6.0.0      | Password hashing            |
| Multer              | ^2.1.0      | File uploads                |
| Zarinpal SDK        | ^2.2.0      | Iranian payment gateway     |
| Express Rate Limit  | ^8.2.1      | Rate limiting               |

## 📦 Prerequisites

- **Node.js** (v18 or higher)
- **Microsoft SQL Server** (2019+)
- **Git**

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Kowsari1382/TS_Store.git
cd TS_Store