import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    title: string;
    detail: string;
    price: string;
    imageUrl: string;
    categoryId: mongoose.Schema.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
    title: { type: String, required: true },
    detail: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ts_category",
        require: true
    }

});


ProductSchema.set("collection", "ts_product")

const productTbl = mongoose.model<IProduct>('ts_product', ProductSchema);

export {
    productTbl as default
}

