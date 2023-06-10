const express = require('express');
const {createBid,getBidsForPost} = require('../Controller/BidController');

const router = express.Router();

// POST route to create a new bid
router.post('/api/create-bid', createBid);

// GET route to fetch bids for a specific post/ad
router.get('/api/get-all-bids:postId', getBidsForPost);

module.exports = router;