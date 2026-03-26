import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/auth.js";
import formRoutes from "./routes/form.js";
import candidateRoutes from "./routes/candidate.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("MongoDB Connection Error: ", err);
        process.exit(1);
    }
};
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes);
app.use("/api/form/:id/candidate", candidateRoutes);

app.get("/", (_req, res) => {
    res.json({ message: "Fair Hire API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});