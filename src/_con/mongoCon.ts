// _con/mongoCon.ts
/* 
Note - this is a simpliest method to inject mongoDB connection in each request..
but the major problem is if the connection lost because of network, connection string error, the application will crash.


Usages.. 
1. import this to the Model 
    import { Document, Schema } from "mongoose";
    import mongoose from "../_con/mongooseCon";
2. create interface and modelSchema then export the schema as usual for controller and router vice versa..

Example of book model file Book.ts


*/


import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

//const MONGODB_URI = 'mongodb://numan:2204@localhost:27017/cDB';
const MONGODB_URI: string = `mongodb://${process.env.__MONGODB_USER}:` +
    `${process.env.__MONGODB_PASS}@${process.env.__MONGODB_HOST}:` +
    `${process.env.__MONGODB_PORT}/${process.env.__MONGODB_DB}`;


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectionOptions);


const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1); // Exit the process on connection error
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default mongoose;
