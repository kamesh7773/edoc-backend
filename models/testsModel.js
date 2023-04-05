const mongoose = require("mongoose");
const testsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    selectTest: {
      type: String,
      required: true,
    },
    testingPurpose: {
      type: String,
      required: true,
    },
    illnestHistoy: {
      type: String,
      required: true,
    },
    time : {
      type: String,
      required: true,
    },
    date : {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    }
  },
  {
    timestamps: true,
  }
);

const testsModel = mongoose.model("tests", testsSchema);
module.exports = testsModel;
