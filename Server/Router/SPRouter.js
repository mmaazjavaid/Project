const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken=require("../MiddleWare/auth")

const {AddSP,EditSP,CheckSP}=require("../Controller/SPController")
const {sp_rating_and_feedback}=require("../Controller/WorkCompletedController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  


router.post("/api/signup-SP", AddSP)

router.post("/api/login-SP", CheckSP)

router.patch("/api/Edit-SP/:id",verifyToken, EditSP)

router.post("/api/sp_rating_feedback",sp_rating_and_feedback)


module.exports = router