import mongoose from "mongoose";

// const creatorSchema = mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number,
// });


const creatorSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  profession: String,
});

const creatorModel = mongoose.model("creator", creatorSchema);

export default creatorModel;
