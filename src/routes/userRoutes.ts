import { Router, Request, Response } from 'express';
import * as GenericController from "../controllers/GenericController";
import userTbl, { IUser } from '../models/User';

const router: Router = Router();


// find() - findAll if rq.body is empty
router.get("/", async (req: Request, res: Response) => {
    const data: Array<any> = await GenericController.findAllByQuery(userTbl, {});
    res.status(200).json(data);
})


// find() - returns all similar if there is a query in req.body
router.post("/findSimilar", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const data = await GenericController.findAllByQuery(userTbl, reqPayload);
    res.status(200).json(data);
})


// findOne() - it returns Only One and most oldest even if there are similar
router.post("/findOne", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const data: IUser = await GenericController.findOne(userTbl, reqPayload);
    res.status(200).json(data);
})



// count documents..
router.post("/count", async (req: Request, res: Response) => {
    const totoal = await GenericController.countDocs(userTbl, req.body);
    res.status(201).json(totoal);
})




/* Note - this fundAndCreate() fun store data in a variable doc:any
Means all the return value i.e "Exists" and result from try block and all the returns of objects form
catch(error) block of the fundAndCreate() will be stored in the doc:any variable.. 
*/
// find and Create if not exists 
router.post("/", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const newCat: IUser = new userTbl(reqPayload);

    /* const newCat: IUser = new userTbl({
        mainCat: req.body.mainCat,
        subCat: req.body.subCat,
        childCat_1: req.body.childCat_1,
    }); */

    const doc: any = await GenericController.createIfNotExists(userTbl, reqPayload, newCat);

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


// createDuplIUsere
router.post("/createDuplIUsere", async (req: Request, res: Response) => {

    const newCat: IUser = new userTbl(req.body.filter);

    const doc: any = await GenericController.createEvenExists(userTbl, newCat);

    if (doc.code === 1100) {
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




// UPDATE - findByIdAndUpdate
/*  in postman
{
    "reqPayload": {
        "title": "Broiler Chicken Skin On 1000kg",
        "detail": "Broiler Chicken Skin On",
        "price": "6.90",
        "imageUrl": "https://chaldn.com/_mpimage/broiler-chicken-skin-on-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D73931&q=best&v=1&m=400&webp=1",
        "categoryId": "6547c6c93eabe5180ed62bf1"
    },
    "update": {
        "imageUrl": "https://product.com/chicken"
    }
}
*/
router.put("/", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;
    const updateData = req.body.update;

    const options = {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    }

    const doc = await GenericController.findAndUpdate(
        userTbl,
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
    const reqPayload = req.body.filter;
    const updateData = req.body.update;

    const options = {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    }

    const doc = await GenericController.updateMany(
        userTbl,
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
    const doc = await GenericController.deleteByID(userTbl, reqPayload);
    res.status(200).json({
        message: "Document Deleted",
        collection: doc
    });
})


// Delete - DeleteMany(query)
router.delete("/delMulti", async (req: Request, res: Response) => {
    const reqPayload = req.body.filter;

    try {
        const doc = await GenericController.deleteMulti(userTbl, reqPayload);
        res.status(200).json(doc);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }

})

export default router;


