import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
    formId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    resumeUrl: string;
    resumeText?: string;
    mlScore?: number;
    mlRank?: number;
    createdAt: Date;
    updatedAt: Date;
}

const CandidateSchema: Schema = new Schema(
    {
        formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        resumeUrl: { type: String, required: true },
        resumeText: { type: String },
        mlScore: { type: Number },
        mlRank: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
