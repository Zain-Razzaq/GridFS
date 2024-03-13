import mongoose from "mongoose";

// const featureSchema = mongoose.Schema({
//   bookTitle: String,
//   bookAuthor: String,
//   content: String,
//   publishedOn: Date,
//   file : String,
// });

const featureSchema = mongoose.Schema(
  {
    fileId: mongoose.Schema.Types.ObjectId,
    fileName: String,
    creatorId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const featureModel = mongoose.model("Feature", featureSchema);

export default featureModel;
