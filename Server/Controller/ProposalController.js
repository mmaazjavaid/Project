const Proposal = require("../Model/ProposalSchema");

const createProposal = async (req, res) => {
  try {
    const {
      Ad_Id,
      Sp_Id,
      budget,
      coverLetter,
      completionTime,
      experience,
      requirements,
      specialOffers,
      discounts,
    } = req.body;

    const proposal = new Proposal({
      Ad_Id,
      Sp_Id,
      budget,
      coverLetter,
      completionTime,
      experience,
      requirements,
      specialOffers,
      discounts,
    });

    const savedproposal = await proposal.save();

    res.status(201).json({ proposal: savedproposal });
  } catch (error) {
    console.error("Error creating bid:", error);
    res.status(500).json({ error: "Failed to create bid" });
  }
};

const getProposalsForPost = async (req, res) => {
  try {
    const bids = await Proposal.find({ Ad_Id: req.params.adId }).populate("Sp_Id").lean().exec();
    res.json(bids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ error: "Failed to fetch bids" });
  }
};

module.exports = {
  createProposal,
  getProposalsForPost,
};
