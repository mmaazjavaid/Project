const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_rating_Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  ad_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String
  }
}, {
  timestamps: true
});


  
const user_rating= mongoose.model('user_rating', user_rating_Schema);

module.exports ={user_rating}