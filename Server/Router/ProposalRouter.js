const express = require("express");
const {
  createProposal,
  getProposalsForPost,
  hireProposal,
  getContracts,
  terminateProposal,
  getSubmittedProposals,
} = require("../Controller/ProposalController");

const router = express.Router();

router.post("/api/create-bid", createProposal);

router.get("/api/get-all-bids/:adId", getProposalsForPost);

router.post("/api/hire-proposal/:proposalId", hireProposal);

router.post("/api/terminate-proposal/:proposalId", terminateProposal);

router.get("/api/get-contracts/:sp_id", getContracts);

router.get("/api/get-submitted-proposals/:spId", getSubmittedProposals);

module.exports = router;
