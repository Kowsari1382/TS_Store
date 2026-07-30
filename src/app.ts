import express from "express";
import { users } from "./routes/user-route.js";
import { UserService } from "./services/user-service.js";
import { UserController } from "./controllers/user-controller.js";
import { UserRepository } from "./repositories/user-repository.js";
import { ErrorHandler } from "./middlewares/ErrorHandler.js";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { ProductRepository } from "./repositories/product-repository.js";
import { ProductService } from "./services/product-service.js";
import { ProductController } from "./controllers/product-controller.js";
import { products } from "./routes/product-route.js";
import { CartRepository } from "./repositories/cart-repository.js";
import { CartService } from "./services/cart-service.js";
import { CartController } from "./controllers/cart-controller.js";
import { carts } from "./routes/cart-route.js";
import { OrderRepository } from "./repositories/order-repository.js";
import { OrderService } from "./services/order-service.js";
import { OrderController } from "./controllers/order-controller.js";
import { orders } from "./routes/order-route.js";
import { IdeaRepository } from "./repositories/idea-repository.js";
import { IdeaService } from "./services/idea-service.js";
import { IdeaController } from "./controllers/idea-controller.js";
import { ideas } from "./routes/idea-route.js";
import { NotFound } from "./middlewares/NotFound.js";
dotenv.config();

const rateLimiter = rateLimit({
    max: 1,
    windowMs: 1000,
    message: "Too many requests!"
})

const app = express();
app.use(rateLimiter)
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//users
const userRepository = new UserRepository();
const cartRepository = new CartRepository();

const userService = new UserService(userRepository, cartRepository);
const userController = new UserController(userService);
app.use("/api/user", users(userController));

//products
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository, cartRepository);
const productController = new ProductController(productService);
app.use("/api/product", products(productController));

//carts
const cartService = new CartService(cartRepository, productRepository, userRepository);
const cartController = new CartController(cartService);
app.use("/api/cart", carts(cartController));

//orders
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, cartRepository, productRepository);
const orderController = new OrderController(orderService);
app.use("/api/order", orders(orderController));

//ideas
const ideaRepository = new IdeaRepository();
const ideaService = new IdeaService(ideaRepository, productRepository, userRepository);
const ideaController = new IdeaController(ideaService);
app.use("/api/idea", ideas(ideaController));

app.use(NotFound);
app.use(ErrorHandler);

app.listen(parseInt(process.env.Port!), process.env.Domain!, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is running on port: ${parseInt(process.env.Port!)}`);
});