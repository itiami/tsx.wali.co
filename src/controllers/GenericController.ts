import mongoose, { Model, Document, FilterQuery, MongooseError, QueryOptions } from 'mongoose';
import { connectDB, closeConnection, connStatus } from "../_con/dbcon";
import { error } from 'node:console';


// find() .. return an Array..
export const findAllByQuery = async (mainEntity: Model<any>, query: any) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;  // returns if mongoose.connect() error
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        const data = await mainEntity.find(query).exec();
        await closeConnection();
        return data;
    } else { // connection error - error message
        return (conStatus);
    }
}


// findOne() .. return an Object.. if josinTbl then populate..
export const findOne = async (mainEntity: Model<any>, query: FilterQuery<any>, joinTbl?: string) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;  // returns if mongoose.connect() error
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        if (joinTbl) {
            const data = await mainEntity.findOne(query).populate(joinTbl).exec();
            await closeConnection();
            return data;
        } else {
            const data = await mainEntity.findOne(query).exec();
            await closeConnection();
            return data;
        }

    } else { // connection error - error message
        return (conStatus);
    }

}



// Create new - this can create duplicate example products
export const create = async (mainEntity: Model<any>, doc: Document) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;  // returns if mongoose.connect() error
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        const newDoc: Document = new mainEntity(doc);
        const result = await newDoc.save();
        await closeConnection();
        return result;
    } else { // connection error - error message
        return (conStatus);
    }
}



/* Note - this createIfNotExists() fun store data in a variable doc:any
Means all the return value i.e "Exists" and result from try block and all the returns of objects form
catch(error) block of the createIfNotExists() will be stored in the doc:any variable.. 
*/
// verify and create - example to create category or user profile casue duplicate not allowed
export const createIfNotExists = async (mainEntity: Model<any>, query: FilterQuery<any>, doc: Document) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;  // returns if mongoose.connect() error
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        const isExists = await mainEntity.findOne(query).exec();

        try {
            if (isExists) {
                console.log("Document Exists..");
                return "Exists";
            } else {
                const newDoc: Document = new mainEntity(doc);
                const result = await newDoc.save();
                await closeConnection();
                return result
            }
        } catch (error: any) {
            if (error.code === 1000) {

            }
            return ({
                message: error.message,
                code: error.code,
                index: error.index,
                keyPattern: error.keyPattern,
                keyValue: error.keyValue,
            });
        }

    } else { // connection error - error message
        return (conStatus);
    }

}




// createDuplicate Documents Example this helps to create products even exists but should not for tbl example Category
export const createEvenExists = async (mainEntity: Model<any>, doc: Document) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;  // returns if mongoose.connect() error
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // here this try catch important case its returns  E11000 duplicate error
        try {
            const newDoc: Document = new mainEntity(doc);
            const result = await newDoc.save();
            await closeConnection();
            return result
        } catch (error: any) {
            return ({
                message: error.message, //E11000 duplicate error
                code: error.code,
                index: error.index,
                keyPattern: error.keyPattern,
                keyValue: error.keyValue,
            });
        }

    } else { // connection error - error message
        return (conStatus);
    }
}



// Create - OneToMany and ManyToOne update. means create product and update Category entity product array..
export const createAndUpdate = async (mainEntity: Model<any>, query: FilterQuery<any>, update?: FilterQuery<any>, options?: QueryOptions) => {

}







// findAndUpdate document - there will be two nested object in req.body -> query and update..
export const findAndUpdate = async (mainEntity: Model<any>, query: FilterQuery<any>, update?: FilterQuery<any>, options?: QueryOptions) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        const row = await mainEntity.findOne(query);
        if (row) {
            const result: Document = await mainEntity.findByIdAndUpdate(row._id, update, options).exec();
            await closeConnection();
            return result;
        } else {
            return "Document Not Found"
        }

    } else { // connection error - error message
        return (conStatus);
    }
}


// UpdateMany - 
// findAndUpdate - 2 obj in req.body qury and update..
export const updateMany = async (mainEntity: Model<any>, query: FilterQuery<any>,
    update?: FilterQuery<any>, options?: QueryOptions) => {

    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        const row = await mainEntity.findOne(query);
        if (row) {
            const result = await mainEntity.updateMany(query, update, options).exec();
            await closeConnection();
            return result;
        } else {
            return "Document Not Found"
        }

    } else { // connection error - error message
        return (conStatus);
    }


}



// delete document - findByIdAndDelete
export const deleteByID = async (mainEntity: Model<any>, query: FilterQuery<any>) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here

        const doc: Document = await mainEntity.findOne(query).exec();

        if (doc) {
            const data = await mainEntity.findByIdAndDelete(doc._id).exec();
            await closeConnection();
            console.log("Document deleted. ID: ", doc._id);
            return data;
        } else {
            console.log("Document not found");
            return "Document not found"
        }

    } else { // connection error - error message
        return (conStatus);
    }
}


// delete document - findByIdAndDelete
export const deleteMulti = async (mainEntity: Model<any>, query: FilterQuery<any>) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here       
        const data = await mainEntity.find(query).exec();
        if (data) {
            await mainEntity.deleteMany(query).exec()
            await closeConnection();
            console.log(data);

            return data;
        } else {
            console.log("No Data Found");
            return "No Data Found"
        }

    } else { // connection error - error message
        return (conStatus);
    }
}


// count total documents..
export const countDocs = async (model: Model<any>, query: FilterQuery<any>) => {
    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        const count = await model.count(query); // will be deprecated cause - could potentially return a metadata count from the storage 
        const countDocs = await model.countDocuments(query).exec(); // count based on query. but if query empty returns total..
        const estimatedDocs = await model.estimatedDocumentCount().exec(); // for Total count
        await closeConnection();
        return ({
            total: count,
            totalDocs: countDocs,
            estimatedDocumentCount: estimatedDocs
        });

    } else { // connection error - error message
        return (conStatus);
    }
}



// Delete documents and update OneToMany 
export const deleteAndUpdate = async (mainTbl: Model<any>,
    query: FilterQuery<any>, mappedTbl: Model<any>,
    schemaName: string) => {

    let conStatus: any = "";
    await connectDB().then((results) => {
        conStatus = results;
    })

    if (conStatus !== "" && conStatus === 1) { // if db connected
        // CRUD Logic.. Here
        const mainTblDoc: Document = await mainTbl.findOne(query).exec();

        if (query) {
            if (mainTblDoc) {
                const mainTblSchema = mainTblDoc.schema.paths["categoryId"].path; // categoryId
                const mappedTblDoc: Document = await mappedTbl.findById(mainTblDoc.get(mainTblSchema)).exec();
                //const mappedTblSchema = mappedTblDoc.schema.paths["product"].path; 
                // to get Schema Propertiy .. output product

                // to set Object key from a variable
                const variableValue = schemaName;
                const jsonObject = {
                    [variableValue]: mainTblDoc._id,
                };

                //console.log(jsonObject); // { product: new ObjectId("654ffeafecdc1a01fea0e652") }
                //console.log({ _id: mainTblDoc.get(mainTblSchema) }); // { _id: new ObjectId("654f8540045eb4bc7293f6eb") }
                const obj: any = Object.values(mappedTblDoc)[2]; // output will be the array 


                const delMainTblDoc = await mainTbl.deleteOne(query).exec();
                const updateMappedTbl = await mappedTbl.updateOne(
                    { _id: mainTblDoc.get(mainTblSchema) },
                    {
                        $pull: jsonObject,
                        $set: { __v: obj[schemaName].length - 1 } // this will count the number of arry then update __v

                    }
                ).exec();

                console.log({
                    mainTbl: delMainTblDoc,
                    mappedTbl: updateMappedTbl
                });

                return ({
                    message: {
                        mainTbl: delMainTblDoc,
                        mappedTbl: updateMappedTbl
                    },
                    code: 201
                })
            } else {
                return ({
                    message: "Document Not Found",
                    code: 404
                })
            }
        } else {
            return ({
                message: "Please verify the Request Body",
                code: 400
            })
        }
    } else { // connection error - error message
        return (conStatus);
    }
}