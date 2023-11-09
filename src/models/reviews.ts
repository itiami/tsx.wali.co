// product and review 1:N models/reviews.js


import mongoose, { Document, Schema } from 'mongoose';





const ReviewSchma: Schema = new mongoose.Schema(
    {
        rate: Number,
        comments: String,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productSchema"
        }
    },
    {
        timestamps: true
    }
);

// set collection name in mongoDB Server
ReviewSchma.set("collection", "review");

/*
To create table/collection using 
mongoose.model(name, schema);
This name is use as a reference to make relation with other collection.
Example review table with product table
*/

const reviewTbl = mongoose.model("reviewSchema", ReviewSchma);

export {
    reviewTbl as default
}

