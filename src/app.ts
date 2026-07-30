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

//repositories
const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const cartRepository = new CartRepository();
const orderRepository = new OrderRepository();
const ideaRepository = new IdeaRepository();

//services
const userService = new UserService(userRepository, cartRepository);
const productService = new ProductService(productRepository, cartRepository);
const cartService = new CartService(cartRepository, productRepository, userRepository);
const orderService = new OrderService(orderRepository, cartRepository, productRepository);
const ideaService = new IdeaService(ideaRepository, productRepository, userRepository);

//controllers
const userController = new UserController(userService);
const productController = new ProductController(productService);
const cartController = new CartController(cartService);
const orderController = new OrderController(orderService);
const ideaController = new IdeaController(ideaService);

//routes
app.use("/api/user", users(userController));
app.use("/api/product", products(productController));
app.use("/api/cart", carts(cartController));
app.use("/api/order", orders(orderController));
app.use("/api/idea", ideas(ideaController));

app.use(NotFound);
app.use(ErrorHandler);

app.listen(parseInt(process.env.Port!), process.env.Domain!, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is running on port: ${parseInt(process.env.Port!)}`);
});