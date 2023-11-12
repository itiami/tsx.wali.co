import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
    orderNo: Number;
    orderStatus: String;
    totalAmount: Number;
    userId: mongoose.Schema.Types.ObjectId;
    paymentId: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
}

const OrderSchema: Schema = new mongoose.Schema(
    {
        orderNo: {
            type: Number,
            require: true,
            default: Math.floor(Date.now())
        },
        orderStatus: String, // i.e delivered, undelivered, pause, cancell, in Preparation etc...
        totalAmount: {
            type: Number,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userProfileSchema"
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "paymentSchema"
        },
        productId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productSchema"
            }
        ],
    },
    { timestamps: true }
);

// set collection name in mongoDB Server
OrderSchema.set("collection", "ts_order");

const orderTbl = mongoose.model("ts_order", OrderSchema);

export {
    orderTbl as default
}
