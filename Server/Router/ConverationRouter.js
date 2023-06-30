const express = require("express");
const router = express.Router();

const Conversation = require("../Model/Conversation");
const Message = require("../Model/Message");

//new conv

router.post("/api/conversation", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    adId: req.body.adId,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/get-active-conversations/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: { $in: [req.params.userId] } })
      .lean()
      .exec();
    const updatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadMessages = await Message.exists({
          conversationId: conversation._id,
          sender: { $ne: req.params.userId },
          isRead: false,
        });
        const active = unreadMessages ? true : false;

        return {
          ...conversation,
          active,
        };
      })
    );
    res.status(200).json(updatedConversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/api/read-conversation/:userId/:conversationId", async (req, res) => {
  try {
    const messages = await Message.updateMany(
      {
        conversationId: req.params.conversationId,
        sender: { $ne: req.params.userId },
      },
      { $set: { isRead: true } }
    );

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/conversation/:userId/:spId/:adId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      $and: [
        { members: { $all: [req.params.userId, req.params.spId] } },
        { adId: req.params.adId },
      ],
    })
      .lean()
      .exec();

    const updatedConversations = await Promise.all(
      conversation.map(async (conversation) => {
        const unreadMessages = await Message.exists({
          conversationId: conversation._id,
          sender: { $ne: req.params.userId },
          isRead: false,
        });
        const active = unreadMessages ? true : false;

        return {
          ...conversation,
          active,
        };
      })
    );
    res.status(200).json(updatedConversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/conversation/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: { $in: [req.params.userId] } })
      .lean()
      .exec();
    const updatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadMessages = await Message.exists({
          conversationId: conversation._id,
          sender: { $ne: req.params.userId },
          isRead: false,
        });
        const active = unreadMessages ? true : false;

        return {
          ...conversation,
          active,
        };
      })
    );
    res.status(200).json(updatedConversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/api/conversation/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
