import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import booksRouter from "./routes/books";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/books", booksRouter);

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));


app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(publicPath, "index.html"));
});


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/booksdb";
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
