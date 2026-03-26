import mongoose, { Schema, Document } from "mongoose";

export interface IForm extends Document {
    title: string;
    requirements: {
        skills: string[];
        experience: number;
        education: string[];
    };
    candidatesCount: number;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const FormSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        requirements: {
            skills: [{ type: String }],
            experience: { type: Number, default: 0 },
            education: [{ type: String }],
        },
        candidatesCount: { type: Number, default: 0 },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IForm>("Form", FormSchema);
