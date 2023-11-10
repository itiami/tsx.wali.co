import { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Document, MongooseError, MongooseQueryAndDocumentMiddleware, MongooseQueryOrDocumentMiddleware } from 'mongoose';
import * as GenericController from "../controllers/GenericController";
import catTbl, { ICat } from '../models/Category';
import { connectDB } from '../_con/dbcon';

const router: Router = Router();


// find() - findAll if rq.body is empty
router.get("/", async (req: Request, res: Response) => {
    const data: Array<any> = await GenericController.findAllByQuery(catTbl, {});
    res.status(200).json(data);
})


// find() - returns all similar if there is a query in req.body
router.post("/findSimilar", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const data = await GenericController.findAllByQuery(catTbl, reqPayload);
    res.status(200).json(data);
})


// findOne() - it returns Only One and most oldest even if there are similar
router.post("/findOne", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const data: ICat = await GenericController.findOne(catTbl, reqPayload);
    console.log(data.mainCat);
    console.log(data.subCat);
    console.log(data.childCat_1);
    res.status(200).json(data);
})



// count documents..
router.post("/count", async (req: Request, res: Response) => {
    const filter = req.body;
    const totoal = await GenericController.countDocs(catTbl, req.body);
    res.status(201).json(totoal);
})




/* Note - this fundAndCreate() fun store data in a variable doc:any
Means all the return value i.e "Exists" and result from try block and all the returns of objects form
catch(error) block of the fundAndCreate() will be stored in the doc:any variable.. 
*/
// find and Create if not exists 
router.post("/", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const newCat: ICat = new catTbl(reqPayload);

    /* const newCat: ICat = new catTbl({
        mainCat: req.body.mainCat,
        subCat: req.body.subCat,
        childCat_1: req.body.childCat_1,
    }); */

    const doc: any = await GenericController.createIfNotExists(catTbl, reqPayload, newCat);

    if (doc === "Exists") {
        res.status(404).json("Document Exists..");
    } else if (doc.code === 1100) {
        res.status(404).json({
            message: doc.message,
            code: doc.code,
            index: doc.index,
            keyPattern: doc.keyPattern,
            keyValue: doc.keyValue,
        });
    }
    else {
        console.log("New Document has Created. ID: ", doc);
        res.status(200).json(doc);
    }
})


// createDuplicate
router.post("/createDuplicate", async (req: Request, res: Response) => {
    const newCat: ICat = new catTbl(req.body.filter);
    const doc: any = await GenericController.createEvenExists(catTbl, newCat);
    if (doc.code === 11000) {
        res.status(409).json(doc)
    } else {
        res.status(201).json(doc)
    }
})







// findByIdAndUpdate
/*  in postman
{
    "mainCat": "Body Care",
    "subCat": "Personal care",
    "childCat_1": "Toiletry",
    "update": {
        "mainCat": "Body Care_OK",
        "subCat": "Personal care",
        "childCat_1": "Toiletry"
    }
}
*/
router.put("/", async (req: Request, res: Response) => {
    await connectDB();
    const reqPayload = req.body.filter;
    const updateData = req.body.update;

    const options = {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    }

    const doc = await GenericController.findAndUpdate(
        catTbl,
        reqPayload,
        updateData,
        options
    );

    if (!doc) {
        return res.status(404).json({ message: 'User not found.' });
    } else {
        return res.status(200).json(doc);
    }

})



// UpdateMany
router.put("/updateMany", async (req: Request, res: Response) => {
    await connectDB();
    const reqPayload = req.body.filter;
    const updateData = req.body.update;

    const options = {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    }

    const doc = await GenericController.updateMany(
        catTbl,
        reqPayload,
        updateData,
        options
    );

    if (!doc) {
        return res.status(404).json({ message: 'User not found.' });
    } else {
        return res.status(200).json(doc);
    }

})




// Delete  - findByIdAndDelete(query)
router.delete("/del", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const doc = await GenericController.deleteByID(catTbl, reqPayload);
    res.status(200).json({
        message: "Document Deleted",
        collection: doc
    });
})


// Delete - DeleteMany(query)
router.delete("/delMulti", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;

    try {
        const doc = await GenericController.deleteMulti(catTbl, reqPayload);
        res.status(200).json(doc);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }

})

export default router;
