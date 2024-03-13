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

////////////////////////////////////////////////////////////////////////////////////////////////////
// Get file from MongoDB GridFS
app.get("/file/:id", async (req, res) => {
  try {
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

////////////////////////////////////////////////////////////////////////////////////////////////////

// Add a creator
app.post("/add-creator", async (req, res) => {
  try {
    await creatorModel.create(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a feature
app.post("/add-feature", upload.single("file"), async (req, res) => {
  try {
    const creatorId = req.body.creatorId;
    const file = req.file;

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    });

    const uploadStream = bucket.openUploadStream(file.originalname);
    const id = uploadStream.id;

    uploadStream.end(file.buffer);

    await featureModel.create({
      creatorId,
      fileId: id,
      fileName: file.originalname,
    });

    res.send({ id });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/", async (req, res) => {
  try {
    // send all the creators with their features
    const creators = await creatorModel.find();
    const creatorData = await Promise.all(
      creators.map(async (creator) => {
        const features = await featureModel.find({ creatorId: creator._id });
        return { ...creator._doc, features };
      })
    );
    res.send([...creatorData]);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
