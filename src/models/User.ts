import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: String;
    password: String;
    email: String;
}

const UserSchema: Schema = new mongoose.Schema(
    {
        username: { type: String, },
        password: { type: String, },
        email: { type: String },
    },
    { timestamps: true }
);


UserSchema.set("collection", "ts_user")

export default mongoose.model<IUser>('ts_user', UserSchema);