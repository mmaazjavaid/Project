const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const verifyToken=require("../MiddleWare/auth")
const {ShowUserAds,CreateAd,UpdateAd,ShowSingleAd,DeleteAd,ShowAd,Like_Unlike}=require("../Controller/AdController")


cloudinary.config({
  cloud_name: 'dymoxplvj',
  api_key: '581447427373614',
  api_secret: '27sumSswK98mD2EqhPtc41WreyE'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // specify the folder name
    format: async (req, file) => 'png', // specify the file format to be uploaded
    public_id: (req, file) => `${Date.now()}-${file.originalname}` // generate a unique public id for each image
  }
});
const upload = multer({ storage: storage });

router.post("/api/like-unlike-Ad/",Like_Unlike)
router.post("/api/create-Ad",upload.array('images',20), CreateAd)

router.delete("/api/Delete-Ad/:id", DeleteAd)
router.patch("/api/Update-Ad/:id", upload.array('images'),verifyToken, UpdateAd)
router.get("/api/show-single-Ad/:id",ShowSingleAd)
router.get("/api/show-all-Ads", ShowAd)
router.get("/api/show-user-ads/:user_id",ShowUserAds)

 





module.exports = router