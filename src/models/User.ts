import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

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

UserSchema.pre(
    'save',
    async function (next: any) {
        const user = this;
        if (!user.isModified('password')) return next();
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            next();
            console.log(user.password);
        } catch (error: any) {
            return next(error);
        }
    });

// Compare the given password with the hashed password in the database
UserSchema.methods.comparePassword = async function (password: any) {
    return bcrypt.compare(password, this.password);
};

UserSchema.set("collection", "ts_user")

export default mongoose.model<IUser>('ts_user', UserSchema);