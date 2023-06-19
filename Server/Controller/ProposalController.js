const Proposal = require("../Model/ProposalSchema");
const User = require("../Model/UserSchema");
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

    proposal.save().then(async (savedProposal) => {
      // Run the following code after successfully saving the proposal
      try {
        await User.findByIdAndUpdate(
          { _id: Sp_Id },
          { $inc: { token: -4 } }
        );
        res.status(201).json({ proposal: savedProposal });
      } catch (error) {
        console.error("Error updating user token:", error);
        res.status(500).json({ error: "Failed to update user token" });
      }
    });
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

    const proposal = await Proposal.findOneAndUpdate(
      { _id: req.params.proposalId },
      { $set: { isHired: true, hiredOn: currentDate } },
      { new: true }
    );
    const user = await User.findById(proposal.Sp_Id);
    const total_earnings = user.total_earnings + proposal.budget;

    const result = await User.findByIdAndUpdate(proposal.Sp_Id, { $set: { total_earnings } });
    res.status(200).json({ proposal: proposal, result });
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
