import { Document, Schema } from "mongoose";
import mongoose from "../_con/mongoCon";
// Note - As mongoose class is already imported in _con/mongooseCon.js file, no need to re-import again.

export interface IBook extends Document {
    title: string;
    detail: string;
    price: string;
    imageUrl: string;
    categoryId: mongoose.Schema.Types.ObjectId;
}

const BookSchema: Schema = new Schema({
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


BookSchema.set("collection", "ts_BookSchema")

const Book = mongoose.model<IBook>('ts_BookSchema', BookSchema);

export {
    Book as default
}

