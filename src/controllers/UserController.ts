import { Request, Response } from 'express';
import { connectDB, closeConnection } from '../_con/dbcon';
import User, { IUser } from '../models/User';
import { accessToken, encorder } from '../middleware/jwt';


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



export const findOneReqBody = async (req: Request, res: Response) => {
    await connectDB(); // open MongoDB Connection

    const { username, password } = req.body.filter;

    // findOne() method returns One document as an Object {}. 
    // Note: - If match multiple it returns only the first Document
    // this is a best choise when we create a login system to check if user exist

    if (username === "" && password === "") {
        console.log("username or password can not be empty");
        res.status(204).json({
            message: "username or password can not be empty"
        });
    } else {
        const findOneUser: any = await User.findOne({ username });

        if (findOneUser && await findOneUser.comparePassword(password)) {
            /* console.log(findOneUser);
            res.status(200).json(findOneUser); */
            console.log({
                auth: true,
                //token: accessToken({ username: findOneUser.username, password: findOneUser.password })
                // sending a bcrypted string inside the JWT token insted username or password
                token: accessToken({ key: (await encorder(username)).toString() })
            });
            res.status(200).json({
                auth: true,
                //token: accessToken({ username: findOneUser.username, password: findOneUser.password })
                // sending a bcrypted string inside the JWT token insted username or password
                token: accessToken({ key: (await encorder(username)).toString() })
            });
        } else {
            console.log(req.body);
            res.status(404).json({
                message: "user Not Found"
            });
        }
    }
    await closeConnection(); // closing Connection
};





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