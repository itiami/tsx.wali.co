import mongoose, { MongooseError } from 'mongoose';
import dotenv from "dotenv";
import { ConnectionOptions } from 'tls';
dotenv.config();



export const connectDB = async () => {

    const MONGODB_URI: string = `mongodb://${process.env.__MONGODB_USER}:` +
        `${process.env.__MONGODB_PASS}@${process.env.__MONGODB_HOST}:` +
        `${process.env.__MONGODB_PORT}/${process.env.__MONGODB_DB}`;

    return await mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectionOptions)
        .then((success) => {
            return success.connection.readyState; // return 0,1,2,3, or 99
        })
        .catch((error: MongooseError) => {
            if (error.message === "Authentication failed.") {
                return "Please verify the the Database Server Connection String for username, password or DB name is connect";
            } else {
                return "Please check the Database Server PORT and Host Address";
            }
        })


}



export const closeConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    } catch (err) {
        console.error('Error closing connection', err);
    }
}

export const connStatus = async () => {
    return mongoose.connection.readyState;
}