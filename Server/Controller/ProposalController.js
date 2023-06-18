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

const getContracts = async (req, res) => {
  try {
    const contracts = await Proposal.find({ Sp_Id: req.params.sp_id, hiredOn: { $ne: null } })
      .populate({ path: "Ad_Id", populate: { path: "user_id" } })
      .sort({ hiredOn: 1 })
      .lean()
      .exec();
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const hireProposal = async (req, res) => {
  try {
    const currentDate = new Date();
    const result = await Proposal.updateOne(
      { _id: req.params.proposalId },
      { $set: { isHired: true, hiredOn: currentDate } }
    );
    res.status(200).json({ proposal: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const terminateProposal = async (req, res) => {
  try {
    const currentDate = new Date();
    const result = await Proposal.updateOne(
      { _id: req.params.proposalId },
      { $set: { isHired: false, completionTime: currentDate } }
    );
    res.status(200).json({ proposal: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createProposal,
  getProposalsForPost,
  hireProposal,
  getContracts,
  terminateProposal,
};
