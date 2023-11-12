import mongoose, { Document, Schema } from 'mongoose';

/* export interface IcartItem extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
} */

export interface ICart extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    items: [
        productId: mongoose.Schema.Types.ObjectId,
        quantity: number
    ];
    total: number;
}


const CartSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ts_user",
        require: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ts_product",
                require: true
            },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    total: { type: Number, required: true }
});


CartSchema.set("collection", "ts_cart");

const Cart = mongoose.model<ICart>('ts_cart', CartSchema);

export { Cart as default };
