import mongoose, { Model, Document, FilterQuery, MongooseError, QueryOptions } from 'mongoose';
import { connectDB, closeConnection, connStatus } from "../_con/dbcon";


// find() .. return an Array..
export const findAllByQuery = async (mainEntity: Model<any>, query: any) => {
    await connectDB();
    const data = await mainEntity.find(query).exec();
    await closeConnection();
    return data;
}


// findOne() .. return an Object..
export const findOne = async (mainEntity: Model<any>, query: FilterQuery<any>, joinTbl?: string) => {

    if (joinTbl) {
        await connectDB();
        const data = await mainEntity.findOne(query).populate(joinTbl).exec();
        await closeConnection();
        return data;
    } else {
        await connectDB();
        const data = await mainEntity.findOne(query).exec();
        await closeConnection();
        return data;
    }


}


// findOne() .. return an Object..
export const findOneAndPopulate = async (mainEntity: Model<any>, query: FilterQuery<any>, joinTbl: string) => {
    await connectDB();
    const data = await mainEntity.findOne(query).populate(joinTbl).exec();
    await closeConnection();
    return data;
}


// Create new - this can create duplicate example products
export const create = async (mainEntity: Model<any>, doc: Document) => {
    await connectDB();
    //console.log(await connStatus()); // 1 connected
    const newDoc: Document = new mainEntity(doc);
    const result = await newDoc.save();
    await closeConnection();
    //console.log(await connStatus()); // 0 disconnected
    return result;
}

/* Note - this createIfNotExists() fun store data in a variable doc:any
Means all the return value i.e "Exists" and result from try block and all the returns of objects form
catch(error) block of the createIfNotExists() will be stored in the doc:any variable.. 
*/
// verify and create - example to create category or user profile casue duplicate not allowed
export const createIfNotExists = async (mainEntity: Model<any>, query: FilterQuery<any>, doc: Document) => {
    await connectDB();
    const isExists = await mainEntity.findOne(query).exec();

    try {
        if (isExists) {
            console.log("Document Exists..");
            return "Exists";
        } else {
            const newDoc: Document = new mainEntity(doc);
            const result = await newDoc.save();
            await closeConnection();
            return newDoc
        }
    } catch (error: any) {
        //return (error.message);
        return ({
            message: error.message,
            code: error.code,
            index: error.index,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue,
        });
    }
}




// createDuplicate Documents Example this helps to create products even exists but not for Category
export const createEvenExists = async (mainEntity: Model<any>, doc: Document) => {

    try {
        await connectDB();
        const newDoc: Document = new mainEntity(doc);
        const result = await newDoc.save();
        await closeConnection();
        return result
    } catch (error: any) {
        if (error instanceof MongooseError && error.name === 'MongoServerError' && (error as any).code === 11000) {
            return (
                {
                    message: error.message,
                    name: error.name,
                    stack: error.stack
                }
            );
        }

        return ({
            message: error.message,
            code: error.code,
            index: error.index,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue,
        });
    }
}




// findAndUpdate - 2 obj in req.body qury and update..
export const findAndUpdate = async (mainEntity: Model<any>, query: FilterQuery<any>, update?: FilterQuery<any>, options?: QueryOptions) => {
    await connectDB();

    const row = await mainEntity.findOne(query);
    if (row) {
        const result: Document = await mainEntity.findByIdAndUpdate(row._id, update, options).exec();
        await closeConnection();
        return result;
    } else {
        return "Document Not Found"
    }
}


// UpdateMany - 
// findAndUpdate - 2 obj in req.body qury and update..
export const updateMany = async (mainEntity: Model<any>, query: FilterQuery<any>, update?: FilterQuery<any>, options?: QueryOptions) => {
    await connectDB();

    const row = await mainEntity.findOne(query);
    if (row) {
        const result = await mainEntity.updateMany(query, update, options).exec();
        await closeConnection();
        return result;
    } else {
        return "Document Not Found"
    }
}



// delete document - findByIdAndDelete
export const deleteByID = async (mainEntity: Model<any>, query: FilterQuery<any>) => {
    await connectDB();
    const doc: Document | null = await mainEntity.findOne(query);

    if (doc) {
        const data = await mainEntity.findByIdAndDelete(doc._id);
        await closeConnection();
        console.log("Document deleted. ID: ", doc._id);
        return data;
    } else {
        console.log("Document not found");
        return "Document not found"
    }
}


// delete document - findByIdAndDelete
export const deleteMulti = async (mainEntity: Model<any>, query: FilterQuery<any>) => {
    await connectDB();
    const data = await mainEntity.find(query);
    if (data) {
        await mainEntity.deleteMany(query).exec()
        await closeConnection();
        console.log(data);

        return data;
    } else {
        console.log("No Data Found");
        return "No Data Found"
    }
}


// count total documents..

export const countDocs = async (model: Model<any>, query: FilterQuery<any>) => {
    await connectDB();
    const count = await model.count(query); // will be deprecated cause - could potentially return a metadata count from the storage 
    const countDocs = await model.countDocuments(query); // count based on query. but if query empty returns total..
    const estimatedDocs = await model.estimatedDocumentCount(); // for Total count
    await closeConnection();
    return ({
        total: count,
        totalDocs: countDocs,
        estimatedDocumentCount: estimatedDocs
    });

}