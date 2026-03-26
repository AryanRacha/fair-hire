import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    companyName: string;
    email: string;
    password?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        companyName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["recruiter"], default: "recruiter" },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
