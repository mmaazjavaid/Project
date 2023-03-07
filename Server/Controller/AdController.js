const Ad = require("../model/AdSchema")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const stream = require("stream");
const User = require("../model/UserSchema")
const Like = require("../model/likeSchema");
const { DESTRUCTION } = require("dns");
const MongoClient = require('mongodb').MongoClient;


cloudinary.config({
    cloud_name: 'dykydh3mq',
    api_key: '233324328684992',
    api_secret: 'kr-LL6njsAb5nurMWCGny-cAof8'
});

// =======================================================================================================================
// ================================================    Like Unlike Ad     =====================================================
// =======================================================================================================================
const Like_Unlike = async (req, res) => {

    const { user_id, ad_id } = req.body
    let increment=0;
    const like = new Like({
        user_id,
        ad_id
    })

   

    try {

        const already=await Like.find({ $and: [{ user_id: user_id }, { ad_id: ad_id }]})
        
     
        if(!(already.length===0)){
            increment=-1
            await Like.findOneAndDelete({ $and: [{ user_id: user_id }, { ad_id: ad_id }]})
            await Ad.findByIdAndUpdate({_id:ad_id},{$inc:{likes:increment}})
            
            res.send("unlike successfully")
        }
        else{
            await like.save()
            increment=1
            await Ad.findByIdAndUpdate({_id:ad_id},{$inc:{likes:increment}})
            res.send("like successfully")
        }
        

    }
    catch (err) {
        console.log(err)
    }
}

// =======================================================================================================================
// ================================================     Create Ad     =====================================================
// =======================================================================================================================

const CreateAd = async (req, res) => {

    // object DESTRUCTION (req.body)
    const { location,description, category, user_id,name_in_ad, title, budget, product_detail, product_catagory, likes, points_required, experience_required, skills_required, tags } = req.body;
   
    try {
        //Upload images to Cloudinary
        console.log("files", req.files)
        const imageUrls = [];

        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          console.log(result);
          imageUrls.push(result.secure_url);
        }
        
        // Create a new Ad in MongoDB
        const ad = new Ad({
            location,
            category,
            name_in_ad,
            user_id,
            description,
            title,
            budget,
            product_catagory,
            product_detail,
            tags,
            likes,
            points_required,
            experience_required,
            skills_required,
            images: imageUrls
        });

        await ad.save();

        res.send({ message: 'Ad created successfully!' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
// =======================================================================================================================
// ================================================     Update Ad     =====================================================
// =======================================================================================================================

const UpdateAd = async (req, res) => {
    console.log(req.files[0].path)
    try {
        const UpdateImage = await Promise.all(
            req.files.map(async file => {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'image'
                });
                return result.secure_url;
            })

        );
        const ad = await Ad.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                budget: req.body.budget,
                description: req.body.description,
                images: UpdateImage
            }
        });
        console.log("Ad updated successfuly.")
        return res.status(200).json(ad);

    }
    catch (err) {
        console.log("sorry")
        console.log(err)
        return res.status(404).json(err);

    }

}
// =======================================================================================================================
// ================================================     Delete Ad     =====================================================
// =======================================================================================================================

const DeleteAd = async (req, res) => {
    console.log("in delete")
    const i = req.params.id.toString()
    try {

        Ad.findByIdAndRemove({ _id: req.params.id }, (err, ad) => {
            if (err || !ad) {
                console.log(err + " or " + ad)

                return res.status(404).json({ message: 'Ad not found' });
            }
            return res.status(200).json({ message: 'Ad deleted successfully' });
        });
    }
    catch (err) {

    }

}
// =======================================================================================================================
// ================================================     Show all Ads    =====================================================
// =======================================================================================================================
const ShowAd = async (req, res) => {
    try {
        Ad.find().populate('user_id').exec((err, posts) => {
            if (err) {
              console.error(err);
            } else {
                return res.status(200).json(posts);

            }
          });
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err);

    }

}
// =======================================================================================================================
// ================================================     Show single Ads    =====================================================
// =======================================================================================================================
const ShowSingleAd = async (req, res) => {
    try {
        const ads = await Ad.find({ _id: req.params.id })
        return res.status(200).json(ads);

    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err);

    }

}


const ShowUserAds=async(req,res)=>{
    try {
        const ads = await Ad.find({ user_id: req.params.user_id })
        return res.status(200).json(ads);

    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err);

    }

}


module.exports = { CreateAd,ShowUserAds, UpdateAd, ShowSingleAd, DeleteAd, ShowAd ,Like_Unlike};

