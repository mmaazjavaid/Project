const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  Ad_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad', // Assuming you have a Post schema for the ad/post
    required: true,
  },
  Sp_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a ServiceProvider schema for service providers
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  completionTime: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  specialOffers: {
    type: String,
  },
  discounts: {
    type: String,
  },
}, { timestamps: true });

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;