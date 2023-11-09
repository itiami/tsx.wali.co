import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {

    fname: String,
    lname: String,
    dob: Date,
    contact: String,
    addressType: String,
    isBillingAddress: Boolean,
    isDeliveryAddress: Boolean,
    address: {
        streetNameNum: String,
        city: String,
        coutry: String
    },
    profileImg: String,
    userId: mongoose.Schema.Types.ObjectId,
    order: [mongoose.Schema.Types.ObjectId,]
}

const profileSchema: Schema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        dob: Date,
        contact: String,
        addressType: String,
        isBillingAddress: Boolean,
        isDeliveryAddress: Boolean,
        address: {
            streetNameNum: String,
            city: String,
            coutry: String
        },
        profileImg: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ts_user"
        },
        order: [{ type: mongoose.Schema.Types.ObjectId, ref: "orderSchema" }]
    },
    {
        timestamps: true
    }
);

// set collection name in mongoDB Server
profileSchema.set("collection", "ts_profile");

const profileTbl = mongoose.model<IProfile>("ts_profile", profileSchema);

export {
    profileTbl as default
}
