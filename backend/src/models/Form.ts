import mongoose, { Schema, Document } from "mongoose";

export interface IForm extends Document {
    title: string;
    description: string;
    requirements: string[];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const FormSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        requirements: [{ type: String }],
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IForm>("Form", FormSchema);
