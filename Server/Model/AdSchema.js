const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require('validator');
const Schema = mongoose.Schema

// ===========================  Ad Schema  ===========================

const AdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    category:{
        type:Number,
        required:true
    },
    location: {
        type: String,
        // required:true
    },
    name_in_ad:{
        type:String,
        // required:true
    },
    is_show_phone:{
        type:Boolean,
        // required:true
    },
    product_catagory:{
        type:String,
        // required:true
    },
    product_detail:{
        type: String,
        // required: true
    },
    likes:{
        type:Number
    },
    points_required:{
        type:Number,
        // required:true
    },
    experience_required:{
        type:String,
        // required:true
    },
    skills_required:[
        {type:String}
    ],
    budget: {
        type: Number,
        required: true
    },
    images: [
        { type: String }
    ],
    tags: [
        { type: String }
    ]

}, { timestamps: true })

const Ad = mongoose.model("Ad", AdSchema)


// =========================  Export module  =============================
module.exports = Ad;