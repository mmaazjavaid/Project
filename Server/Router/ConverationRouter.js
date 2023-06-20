const express = require("express");
const router = express.Router();

const Conversation = require("../Model/Conversation");

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

//get conv of a user

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
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/conversation/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({ members: { $in: [req.params.userId] } })
      .lean()
      .exec();
    res.status(200).json(conversation);
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
