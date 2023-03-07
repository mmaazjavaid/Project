const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sp_rating_Schema = new Schema({
  sp_id: {
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


  
const sp_rating= mongoose.model('sp_rating', sp_rating_Schema);

module.exports ={sp_rating}