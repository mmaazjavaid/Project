const express = require("express");
const router = express.Router();
const {upload} = require("../cloudinaryConfig")
const verifyToken=require("../MiddleWare/auth")
const {ShowUserAds,CreateAd,UpdateAd,ShowSingleAd,DeleteAd,ShowAd,Like_Unlike}=require("../Controller/AdController")


router.post("/api/like-unlike-Ad/",Like_Unlike)
router.post("/api/create-Ad",upload.array('images',20), CreateAd)

router.delete("/api/Delete-Ad/:id", DeleteAd)
router.patch("/api/Update-Ad/:id", upload.array('images'),verifyToken, UpdateAd)
router.get("/api/show-single-Ad/:id",ShowSingleAd)
router.get("/api/show-all-Ads", ShowAd)
router.get("/api/show-user-ads/:user_id",ShowUserAds)

 


module.exports = router