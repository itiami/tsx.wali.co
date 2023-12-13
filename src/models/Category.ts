import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface ICat extends Document {
    catNum: number;
    mainCat: string;
    subCat: string;
    childCat_1: string;
    childCat_2: string;
    product: IProduct["_id"][];
}

const CategorySchema: Schema = new Schema(
    {
        catNum: { type: Number },
        mainCat: { type: String, required: true, unique: true },
        subCat: { type: String },
        childCat_1: { type: String },
        childCat_2: { type: String },
        product: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ts_product",
                require: true
            }
        ]
    },
    { timestamps: true }
);


CategorySchema.set("collection", "ts_category")

const catTbl = mongoose.model<ICat>('ts_category', CategorySchema);

export {
    catTbl as default
}


