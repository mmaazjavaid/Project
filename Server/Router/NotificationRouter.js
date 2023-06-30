const express = require("express");
const {
  createNotification,
  readNotification,
  getNotifications,
} = require("../Controller/notificationsController");
const router = express.Router();

router.get("/api/get-user-notfications/:user", getNotifications);
router.post("/api/create-notification", createNotification);
router.post("/api/read-notification/:user", readNotification);

module.exports = router;
