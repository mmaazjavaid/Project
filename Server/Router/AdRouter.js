const express = require("express");
const router = express.Router();
const multer = require('multer');
const verifyToken=require("../MiddleWare/auth")
const {ShowUserAds,CreateAd,UpdateAd,ShowSingleAd,DeleteAd,ShowAd,Like_Unlike}=require("../Controller/AdController")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname +
          "_" +
          Date.now() +
          require("path").extname(file.originalname)
      );
    },
 });
const upload = multer({ storage });

router.post("/api/like-unlike-Ad/",Like_Unlike)
router.post("/api/create-Ad",upload.array('images'), CreateAd)
router.delete("/api/Delete-Ad/:id", DeleteAd)
router.patch("/api/Update-Ad/:id", upload.array('images'),verifyToken, UpdateAd)
router.get("/api/show-single-Ad/:id",ShowSingleAd)
router.get("/api/show-all-Ads", ShowAd)
router.get("/api/show-user-ads/:user_id",ShowUserAds)

 





module.exports = router