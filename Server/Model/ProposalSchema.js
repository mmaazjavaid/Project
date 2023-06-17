const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    Ad_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
    },
    Sp_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    completionTime: {
      type: String,
      // required: true,
    },
    experience: {
      type: String,
      // required: true,
    },
    requirements: {
      type: String,
      // required: true,
    },
    specialOffers: {
      type: String,
    },
    discounts: {
      type: String,
    },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
