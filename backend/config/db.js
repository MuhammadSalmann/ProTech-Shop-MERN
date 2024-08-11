import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;