const express = require("express");
const {
  createProposal,
  getProposalsForPost,
  hireProposal,
  getContracts,
} = require("../Controller/ProposalController");

const router = express.Router();

router.post("/api/create-bid", createProposal);

router.get("/api/get-all-bids/:adId", getProposalsForPost);

router.post("/api/hire-proposal/:proposalId", hireProposal);

router.get("/api/get-contracts/:sp_id", getContracts);

module.exports = router;
