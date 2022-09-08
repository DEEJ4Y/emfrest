/**
 * This file contains the development server to test out the modules in the package.
 */

import { Request, Response, NextFunction } from "express";

import express from "express";
import { Api, connectDB, errorHandler, handlePromiseRejections } from "./index";

connectDB("mongodb://localhost:27017/library");

import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", BookSchema);

const app = express();

app.use(express.json());

Api(app, {
  model: Book,
  modelName: "book",
});

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Check your api endpoint" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

handlePromiseRejections(server);
