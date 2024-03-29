import express, { NextFunction, Request, Response, Router } from 'express';
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


// render file form views directory
app.get("/", (req: Request, res: Response) => {
    res.status(201).render("index.ejs")
})

// render static file from resources..
app.get("/chaldal", (req: Request, res: Response) => {
    res.sendFile("/chaldal/fresh_veg.ejs")
})

app.use('/random', randomApiData);
app.use('/tuto', tutoRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/cart', cartRouter);

function availableRoutes(router: Router, routeName: string) {
    const res = router.stack
        .filter((r: Router) => r.route)
        .map((r: any) => {
            return {
                method: Object.keys(r.route.methods)[0].toUpperCase(),
                path: `http://192.168.1.200:${PORT}/${routeName}${r.route.path}`
            };
        });

    return { [routeName]: res }
}

//console.log(JSON.stringify(availableRoutes(tutoRoutes, "tuto"), null, 2));

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}`);
});