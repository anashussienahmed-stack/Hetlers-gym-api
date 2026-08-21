import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose from "mongoose";
export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" Connected to MongoDB");
    }
    catch (error) {
        console.log(" Connection Failed");
        console.log(error);
    }
}
// منغير الملف ده مفيش مكان يتسجل فيه الداتا
//we connect mongoDB with Express by mongoose
