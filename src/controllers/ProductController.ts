import { Request, Response } from 'express';

import catTbl, { ICat } from '../models/Category';
import productTbl, { IProduct } from '../models/Product';
import { closeConnection, connStatus, connectDB } from '../_con/dbcon';


export const createByCatID = async (req: Request, res: Response) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) {
        const category = await catTbl.findOne(req.body.searchInEntity).exec();

        if (category?._id !== undefined && category?._id !== null) {
            console.log("CategoryID: ", category?._id);

            const newProduct: IProduct = await productTbl.create(req.body.createNew);

            category?.product.push(newProduct._id); // to add _id in product property of catTbl entity
            newProduct.categoryId = await category?._id;
            await newProduct.save()
                .then(data => {
                    res.status(201).json(data);
                }).catch((error: any) => {
                    res.status(404).json(error.message);
                });
            await category?.save();
            await closeConnection();
        } else {
            res.status(404).json("Category Not Found..")
        }
    } else {
        res.status(500).json(conStatus)
    }

}
