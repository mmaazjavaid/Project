const { sp_rating } = require("../Model/spRatingSchema")
const { user_rating } = require("../Model/userRatingSchema")
const { ObjectId } = require('mongodb');
const Ad = require("../model/AdSchema");
const SP = require("../model/SPSchema");
const Users =  require("../model/UserSchema")


// ====================================================================================================================================
// ==============================     rating and feedback to the service provider ======================================
// ====================================================================================================================================

const sp_rating_and_feedback = async (req, res) => {
  const { sp_id, ad_id, rating, feedback } = req.body

 
  try {
    

    const a = await Ad.find({ _id: ad_id })
console.log(a[0].title + " or " + a[0].product_detail + " or " + a[0].budget)

    const sp_rating_obj = {
      title: a[0].title,
      product_detail: a[0].product_detail,
      budget: a[0].budget,
      rating: rating,
      feedback: feedback
    }


    await SP.updateOne({_id:sp_id},{$push:{total_jobs:sp_rating_obj}})


    return res.status(200).json("successfully added");

  } catch (err) {
    console.log(err)
    return res.status(404).json(err)
  }
}

// ====================================================================================================================================
// ==============================     rating and feedback to the user    ==============================================================
// ====================================================================================================================================

const user_rating_and_feedback = async (req, res) => {
  const { user_id, ad_id, rating, feedback } = req.body

 
  try {
    

    const a = await Ad.find({ _id: ad_id })
console.log(a[0].title + " or " + a[0].product_detail + " or " + a[0].budget)

    const sp_rating_obj = {
      title: a[0].title,
      product_detail: a[0].product_detail,
      budget: a[0].budget,
      rating: rating,
      feedback: feedback
    }


    await Users.updateOne({_id:user_id},{$push:{total_jobs:sp_rating_obj}})


    return res.status(200).json("successfully added");

  } catch (err) {
    console.log(err)
    return res.status(404).json(err)
  }
}










module.exports = { sp_rating_and_feedback,user_rating_and_feedback }
