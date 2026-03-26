import express from "express";

const app = express();

app.get("/", (_req, res) => {
    res.json({ message: "Hello World!" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});