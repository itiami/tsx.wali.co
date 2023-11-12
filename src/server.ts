import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes';
import profileRoutes from './routes/profileRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import tutoRoutes from './routes/tutoRoutes';
import randomApiData from './routes/apiRandomDataRoutes'
import cartRouter from "./routes/cartRoutes";

import dotenv from "dotenv";
dotenv.config();
import cors from "cors";


const app = express();

const PORT = 3090;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: false }))



app.use(
    cors({
        //origin: 'http://192.168.1.200:4200',
        origin: '*',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/resources"));

app.get("/", (req: Request, res: Response) => {
    res.status(201).render("index.ejs")
})

app.use('/random', randomApiData);
app.use('/tuto', tutoRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/cart', cartRouter);


app.listen(PORT, HOST, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}`);
});
