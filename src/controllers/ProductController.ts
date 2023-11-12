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
        // CRUD Logic.. Here
        const category = await catTbl.findOne(req.body.findInModel).exec();


        if (category?._id !== undefined && category?._id !== null) {
            console.log("CategoryID: ", category?._id);

            const newProduct: IProduct = await productTbl.create(req.body.createNew);

            category?.product.push(newProduct._id); // in category table - add product id to the list of product
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



export const delProdAndFromCatList = async (req: Request, res: Response) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here 
        const doc = await productTbl.findOne(req.body.query).exec();
        const category = await catTbl.findById(doc?.categoryId).exec();
        const delProd = await productTbl.deleteOne(req.body.query).exec();

        console.log({ product: doc?._id }); // { product: new ObjectId("654ffeafecdc1a01fea0e652") }
        console.log({ _id: doc?.categoryId }); // { _id: new ObjectId("654f8540045eb4bc7293f6eb") }

        if (delProd.deletedCount > 0) {
            const updateCat = await catTbl.updateOne(
                { _id: doc?.categoryId },
                {
                    $pull: { product: doc?._id },
                    $set: { __v: category && category.product.length - 1 }
                }
            ).exec();

            console.log({
                prod: delProd,
                cat: updateCat
            });
            res.send({
                prod: delProd,
                cat: updateCat
            });
        } else {
            res.send("not Exists");
        }

    } else { // connection error - error message
        return (conStatus);
    }
}