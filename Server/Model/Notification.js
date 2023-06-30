const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    sourceObj: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    relatedObj: {
      type: mongoose.Schema.Types.Mixed,
    },
    type: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
