const Ad = require("../Model/AdSchema");
const ObjectId = require("mongodb").ObjectId;
const { cloudinary } = require("../cloudinaryConfig");
const Like = require("../Model/likeSchema");

const Like_Unlike = async (req, res) => {
  const { user_id, ad_id } = req.body;
  let increment = 0;
  const like = new Like({
    user_id,
    ad_id,
  });

  try {
    const already = await Like.find({ $and: [{ user_id: user_id }, { ad_id: ad_id }] });

    if (!(already.length === 0)) {
      increment = -1;
      await Like.findOneAndDelete({ $and: [{ user_id: user_id }, { ad_id: ad_id }] });
      await Ad.findByIdAndUpdate({ _id: ad_id }, { $inc: { likes: increment } });

      res.send("unlike successfully");
    } else {
      await like.save();
      increment = 1;
      await Ad.findByIdAndUpdate({ _id: ad_id }, { $inc: { likes: increment } });
      res.send("like successfully");
    }
  } catch (err) {
    return err;
  }
};

const CreateAd = async (req, res) => {
  const {
    location,
    description,
    category,
    user_id,
    name_in_ad,
    title,
    budget,
    product_detail,
    product_catagory,
    likes,
    points_required,
    experience_required,
    skills_required,
    tags,
  } = req.body;
  try {
    const urls = [];
    req?.files?.forEach((file) => urls.push(file.path));
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
      images: urls,
    });
    const result = await ad.save();
    res.send({ message: "Ad created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UpdateAd = async (req, res) => {
  try {
    const UpdateImage = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const ad = await Ad.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          budget: req.body.budget,
          description: req.body.description,
          images: UpdateImage,
        },
      }
    );
    return res.status(200).json(ad);
  } catch (err) {
    return res.status(404).json(err);
  }
};

async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(`uploads/${publicId}`);
  } catch (error) {
    return res.json({ error: error });
  }
}

const DeleteAd = async (req, res) => {
  const i = req.params.id.toString();

  try {
    const post = await Ad.findByIdAndDelete({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ error: "Ad not found" });
    }

    for (const imageUrl of post.images) {
      const publicId = getImagePublicId(imageUrl);
      await deleteImage(publicId);
    }
    return res.status(200).json({ message: "Ad deleted successfully" });
  } catch (error) {
    return res.status(501).json({ error: "Ad not deleted" });
  }
};

function getImagePublicId(imageUrl) {
  const startIndex = imageUrl.lastIndexOf("/") + 1;
  const endIndex = imageUrl.lastIndexOf(".");
  return imageUrl.substring(startIndex, endIndex);
}

const ShowAd = async (req, res) => {
  try {
    var loggedInSpId = new ObjectId(req.params.user_id);

    const posts = await Ad.aggregate([
      {
        $lookup: {
          from: "proposals",
          localField: "_id",
          foreignField: "Ad_Id",
          as: "proposals",
        },
      },
      {
        $addFields: {
          matchingProposals: {
            $filter: {
              input: "$proposals",
              as: "proposal",
              cond: { $eq: ["$$proposal.Sp_Id", loggedInSpId] },
            },
          },
        },
      },
      {
        $match: {
          matchingProposals: { $size: 0 },
        },
      },
      {
        $unset: "matchingProposals",
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(404).json(err);
  }
};

const ShowSingleAd = async (req, res) => {
  try {
    const ads = await Ad.find({ _id: req.params.id });
    return res.status(200).json(ads);
  } catch (err) {
    return res.status(404).json(err);
  }
};

const ShowUserAds = async (req, res) => {
  try {
    const ads = await Ad.find({ user_id: req.params.user_id }).populate("user_id");
    return res.status(200).json(ads);
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = { CreateAd, ShowUserAds, UpdateAd, ShowSingleAd, DeleteAd, ShowAd, Like_Unlike };
