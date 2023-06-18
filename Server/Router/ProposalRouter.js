const express = require("express");
const { createProposal, getProposalsForPost } = require("../Controller/ProposalController");

const router = express.Router();

router.post("/api/create-bid", createProposal);

router.get("/api/get-all-bids/:adId", getProposalsForPost);

module.exports = router;
