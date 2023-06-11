
const Bid = require('../Model/BidSchema');

// Create a new bid
const createBid = async (req, res) => {
  try {
    const { Ad_Id, Sp_Id, budget, completionTime, experience, requirements, specialOffers, discounts } = req.body;

    // Perform bid validation if necessary

    // Create a new bid and save it in the database
    const bid = new Bid({
      Ad_Id,
      Sp_Id,
      budget,
      completionTime,
      experience,
      requirements,
      specialOffers,
      discounts,
    });

    const savedBid = await bid.save();

    res.status(201).json(savedBid);
  } catch (error) {
    console.error('Error creating bid:', error);
    res.status(500).json({ error: 'Failed to create bid' });
  }
};

// Get all bids for a specific post/ad
const getBidsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Retrieve bids from the database for the specified post/ad
    const bids = await Bid.find({ postId });

    res.json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
};

module.exports = {
  createBid,
  getBidsForPost,
};