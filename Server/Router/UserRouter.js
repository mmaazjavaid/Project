const express = require("express");
const router = express.Router();
const multer = require("multer");

const { AddUser, EditUser, CheckUser , GetUser} = require("../Controller/UserController");
const {user_rating_and_feedback} = require("../Controller/WorkCompletedController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/api/signup-User", AddUser);
router.post("/api/login-User", CheckUser);
router.patch("/api/Edit-User/:id", EditUser);
router.get("/api/get-User/:user_id", GetUser);
router.post("/api/user_rating_feedback", user_rating_and_feedback);
module.exports = router;
