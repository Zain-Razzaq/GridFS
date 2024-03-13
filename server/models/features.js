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
    fileID: mongoose.Schema.Types.ObjectId,
    fileName: String,
    creatorID: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const featureModel = mongoose.model("Feature", featureSchema);

export default featureModel;
