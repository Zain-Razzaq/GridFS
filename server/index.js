import express from "express";
import { MONGODB_URI, PORT } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import featureModel from "./models/features.js";
import creatorModel from "./models/creators.js";
import multer from "multer";
import { GridFSBucket } from "mongodb";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to the MongoDB server");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to the MongoDB server", err);
});

app.use(express.json());

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload file to MongoDB GridFS
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    });

    const uploadStream = bucket.openUploadStream(file.originalname);
    const id = uploadStream.id;

    uploadStream.end(file.buffer);

    res.send({ id });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/file/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    console.log(req.params.id);
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    });
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/", async (req, res) => {
  // fetching creators data from the database
  const creatorData = await creatorModel.find();

  // fetching features data from the database
  const featureData = await featureModel.find();

  res.send({ creatorData, featureData });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
