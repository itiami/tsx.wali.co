import { connectDB, closeConnection, connStatus } from "../_con/dbcon";
import { Request, Response } from 'express';
import Cart, { ICart } from "../models/Cart";
import User, { IUser } from "../models/User";

export const createCart = async (req: Request, res: Response) => {
    let conStatus: any = '';
    await connectDB().then(results => (conStatus = results))
    if (conStatus !== '' && conStatus === 1) {
        // CRUD Logic.. Here
        const query = req.body.newItem; // {newItem:{}}

        const user: IUser | null = await User.findById(query).exec();

        const newCart: ICart = await Cart.create(query);
        newCart.save();
        res.status(201).json("data");

    } else {
        res.status(500).json(conStatus)
    }


}