import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        amount: Number,
        currencey: {
            type: String,
            default: "EUR"
        },
        status: String,
        paymentMethod: String,
        date: {
            type: Date,
            default: Date.now()
        },
        userLoginId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userLoginSchema"
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orderSchema"
        }
    },
    { timestamps: true }
);

// set collection name in mongoDB Server
paymentSchema.set("collection", "payment");

const paymentTbl = mongoose.model("paymentSchema", paymentSchema);

export {
    paymentTbl as default
}
