const Notification = require("../Model/Notification");
const Proposal = require("../Model/ProposalSchema");
const Message = require("../Model/Message");
const User = require("../Model/UserSchema");
const Ad = require("../Model/AdSchema");

const createNotification = async (req, res) => {
  try {
    const { user, sourceObj, relatedObj, type } = req.body;
    const notification = new Notification({
      user,
      sourceObj,
      relatedObj,
      type,
    });
    await notification.save();
    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const readNotification = async (req, res) => {
  try {
    const { user } = req.params;
    const notifications = await Notification.updateMany(
      { user, isRead: false },
      { $set: { isRead: true } }
    );

    if (notifications.nModified === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No unread notifications found for the user" });
    }

    res.status(200).json({ success: true, message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { user } = req.params;
    const notifications = await Notification.find({ user })
      .sort({ createdAt: -1 })
      .populate("sourceObj")
      .lean()
      .exec();

    const populatedNotifications = await Promise.all(
      notifications.map(async (notification) => {
        let populatedNotification = { ...notification };

        switch (notification.type) {
          case "Proposal":
          case "ProposalHire":
          case "ProposalTerminate":
            populatedNotification.relatedObj = await Proposal.findById(notification.relatedObj)
              .lean()
              .exec();
            populatedNotification.relatedObj.Sp_Id = await User.findById(
              populatedNotification.relatedObj.Sp_Id
            )
              .lean()
              .exec();
            populatedNotification.relatedObj.Ad_Id = await Ad.findById(
              populatedNotification.relatedObj.Ad_Id
            )
              .lean()
              .exec();
            break;
          case "Message":
            populatedNotification.relatedObj = await Message.findById(notification.relatedObj)
              .lean()
              .exec();
            break;
          default:
            populatedNotification.relatedObj = null;
            break;
        }

        return populatedNotification;
      })
    );

    res.status(200).json(populatedNotifications);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createNotification, readNotification, getNotifications };
