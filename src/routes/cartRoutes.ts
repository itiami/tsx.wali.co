import { Router, Request, Response, NextFunction } from 'express';
import * as GenericController from '../controllers/GenericController';
import * as CartController from "../controllers/CartController";
const router: Router = Router();


router.get("/", async (req: Request, res: Response) => {
    const data = await GenericController.findAllByQuery;
    res.status(201).json(data);
});


router.post("/", CartController.createCart);


export { router as default };