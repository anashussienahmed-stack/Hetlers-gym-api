import "dotenv/config" //to read from .env
import express from "express"
import cookieParser from "cookie-parser"; // عشان نقرا الكوكيز
import {connectDB} from "./config/db"
import bookingRoutes from "./routes/bookingRoutes"

//import swagger

import authRoutes from "./routes/authRoutes"
//import routes
//
//
//

const app = express()
const PORT = process.env.PORT || 3000 // عشان السيرفر يقرا البورت الخاص ب railway

app.use(express.json()) // to read the data from req.body
app.use(cookieParser()); // to read the cookies from req.cookies
app.use("/api/bookings", bookingRoutes);

connectDB() // to connect mongoDB with mongoose بدء الاتصال بالداتا بيز


app.use("/api/auth",authRoutes)




app.listen(PORT,()=>{
    console.log (`Server running on port ${PORT}`)
})