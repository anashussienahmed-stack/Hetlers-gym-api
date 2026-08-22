import "dotenv/config" //to read from .env
import express from "express"
import cookieParser from "cookie-parser"; // عشان نقرا الكوكيز
import {connectDB} from "./config/db.js"

import bookingRoutes from "./routes/bookingRoutes.js"
import { loggingMiddleware } from "./middlewares/loggingMiddleware.js"; // bonus logging middleware
import classRoutes from "./routes/class.routes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger"; // adjust path if needed


//import swagger

import authRoutes from "./routes/authRoutes.js"
//import routes
//
//
//

const app = express()
const PORT = process.env.PORT || 3000 // عشان السيرفر يقرا البورت الخاص ب railway

// Add this right before your API routes:


app.use(express.json()) // to read the data from req.body
app.use(cookieParser()); // to read the cookies from req.cookies
app.use(loggingMiddleware)// عشان يمسك اي ريكويست هيجي

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);

connectDB() // to connect mongoDB with mongoose بدء الاتصال بالداتا بيز

app.listen(PORT,()=>{
    console.log (`Server running on port ${PORT}`)
})