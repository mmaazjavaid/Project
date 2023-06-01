const { user_rating } = require("../Model/userRatingSchema")
const { ObjectId } = require('mongodb');
const Ad = require("../Model/AdSchema");
const User = require("../Model/UserSchema");


// ====================================================================================================================================
// ==============================     rating and feedback to the user    ==============================================================
// ====================================================================================================================================

const user_rating_and_feedback = async (req, res) => {
  const { user_id, ad_id, rating, feedback } = req.body


  try {


    const a = await Ad.find({ _id: ad_id })
    const user_rating_obj = {
      title: a[0].title,
      product_detail: a[0].product_detail,
      budget: a[0].budget,
      rating: rating,
      feedback: feedback
    }


    await User.updateOne({ _id: user_id }, { $push: { total_jobs: user_rating_obj } })


    return res.status(200).json("successfully added");

  } catch (err) {
    return res.status(404).json(err)
  }
}










module.exports = {  user_rating_and_feedback }
