TS_Store

A TypeScript-based e-commerce store backend built with Express.js and SQL Server.

📖 Description

TS_Store is a RESTful API backend for an online store application. It provides complete CRUD operations for users, products, orders, and shopping carts. The project follows a clean layered architecture with clear separation of concerns, making it maintainable and scalable.

🚀 Technologies

· TypeScript — Static typing for robust code
· Express.js — Web framework for Node.js
· SQL Server — Relational database
· Node.js — Runtime environment

✨ Features

· User Management — Register, authenticate, and manage user profiles
· Product Management — Create, read, update, and delete products
· Shopping Cart — Add/remove items, update quantities
· Order Processing — Place orders and view order history
· Modular Architecture — Clean separation into controllers, services, repositories, and models
· Type Safety — Full TypeScript support with interfaces

📁 Project Structure

```
TS_Store/
├── src/
│   ├── Cart/              # Shopping cart module
│   │   ├── interfaces/    # Cart type definitions
│   │   ├── cart-controller.ts
│   │   ├── cart-model.ts
│   │   ├── cart-repository.ts
│   │   ├── cart-route.ts
│   │   └── cart-service.ts
│   ├── Order/             # Order management module
│   ├── Product/           # Product management module
│   │   ├── interfaces/
│   │   ├── product-controller.ts
│   │   ├── product-model.ts
│   │   ├── product-repository.ts
│   │   ├── product-route.ts
│   │   └── product-service.ts
│   ├── User/              # User management module
│   │   ├── interfaces/
│   │   ├── user-controller.ts
│   │   ├── user-model.ts
│   │   ├── user-repository.ts
│   │   ├── user-route.ts
│   │   └── user-service.ts
│   ├── Idea/              # Additional features
│   ├── middlewares/       # Express middlewares
│   ├── utilities/         # Helper utilities
│   └── app.ts             # Application entry point
├── Shop.mdf               # SQL Server database file
├── package.json
├── tsconfig.json
└── .gitignore
```

🏗️ Architecture

The project follows a layered architecture pattern:

· Route Layer — Defines API endpoints and HTTP methods
· Controller Layer — Handles HTTP requests/responses
· Service Layer — Contains business logic
· Repository Layer — Handles database operations
· Model Layer — Defines data structures

This separation ensures that each layer has a single responsibility, making the code easier to test, maintain, and extend.

🔧 Installation & Setup

Prerequisites

· Node.js (v14 or higher)
· SQL Server (local or cloud instance)
· npm or yarn

Steps

1. Clone the repository

```bash
git clone https://github.com/Kowsari1382/TS_Store.git
cd TS_Store
```

2. Install dependencies

```bash
npm install
```

3. Configure the database
   · Attach the Shop.mdf file to your SQL Server instance
   · Update connection settings in the configuration files
4. Build the project

```bash
npm run build
```

5. Start the server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

📡 API Endpoints

Method Endpoint Description
GET /api/users Get all users
POST /api/users Create a new user
GET /api/users/:id Get user by ID
PUT /api/users/:id Update user
DELETE /api/users/:id Delete user
GET /api/products Get all products
POST /api/products Create a new product
GET /api/products/:id Get product by ID
PUT /api/products/:id Update product
DELETE /api/products/:id Delete product
GET /api/cart Get cart items
POST /api/cart Add item to cart
PUT /api/cart/:id Update cart item
DELETE /api/cart/:id Remove item from cart
GET /api/orders Get all orders
POST /api/orders Place a new order
GET /api/orders/:id Get order by ID

Note: Some endpoints may require authentication. Check the source code for detailed implementation.

🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

📄 License

This project is open source and available under the MIT License.

👤 Author

Kowsari1382

· GitHub: @Kowsari1382

---

⭐ If you find this project useful, please give it a star!