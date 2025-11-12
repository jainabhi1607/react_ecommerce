import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import authRouter from "./routes/authRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { rateLimit } from "express-rate-limit";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

await connectToDB();
// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
    ];

    // Allow any subdomain that ends with vercel.app
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/order", orderRouter);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter);

const port = process.env.PORT;
app.listen(port, () => console.log("Server start at port", port));
