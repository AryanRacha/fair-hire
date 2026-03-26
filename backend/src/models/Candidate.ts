import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
    formId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    resumeUrl: string;
    matchScore?: number;
    fitScore?: number;
    fitBreakdown?: any;
    resumeQuality?: any;
    limeData?: any[];
    createdAt: Date;
    updatedAt: Date;
}

const CandidateSchema: Schema = new Schema(
    {
        formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        resumeUrl: { type: String, required: true },
        matchScore: { type: Number, default: 0 },
        fitScore: { type: Number, default: 0 },
        fitBreakdown: { type: Schema.Types.Mixed },
        resumeQuality: { type: Schema.Types.Mixed },
        limeData: [{ type: Schema.Types.Mixed }],
    },
    { timestamps: true }
);

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
