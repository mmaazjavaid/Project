const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    roll: {
      type: Number,
    },
    token:{
      type:Number,
      default:100
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    per_hour: {
      type: Number,
    },
    location: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required:true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password should be at least 8 characters long"],
    },
    total_earnings: {
      type: Number,
      default: 0,
    },
    total_jobs: [
      {
        type: Object,
      },
    ],
    total_hours: {
      type: Number,
      default: 0,
    },
    skills: [
      {
        type: String,
      },
    ],
    education: [
      {
        type: String,
      },
    ],
    experience: [
      {
        type: Object,
      },
    ],
    profile_image: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
