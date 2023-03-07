const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require('validator');
const Schema = mongoose.Schema;


// ===========================  Ad Schema  ===========================

const likeSchema = new mongoose.Schema({
  user_id:{
    type: Schema.Types.ObjectId,
    required:true
  },
  ad_id:{
    type:Schema.Types.ObjectId,
    required:true
  }
}, { timestamps: true })

const like = mongoose.model("like", likeSchema)


// =========================  Export module  =============================
module.exports = like;