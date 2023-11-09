import { Request, Response } from 'express';
import { connectDB, closeConnection } from '../_con/dbcon';
import User, { IUser } from '../models/User';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        await connectDB();
        const users = await User.find();
        res.status(201).json(users)
        await closeConnection();
    } catch (err: any) {
        console.log("Error: ", err.message);
        res.status(500).json({ message: err.message });

    }
}


export const createUser = async (req: Request, res: Response) => {

    try {
        await connectDB();
        const user: IUser = new User({
            name: req.body.username,
            email: req.body.email
        });
        const saveUser = await user.save();
        res.status(201).json(saveUser)
        await closeConnection();
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        })
    }



}