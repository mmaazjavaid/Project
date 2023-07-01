import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Badge} from "@mui/material";
import {
  clearProposalsAlert,
  getProposalsRequest,
  hireProposalRequest,
  terminateProposalRequest,
} from "../../../state/ducks/proposals/proposalsSlice";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import SnackbarAlert from "../../Common/Alerts/SnackbarAlert";
import BackDropLoader from "../../Common/Loaders/BackDropLoader";
import RatingModal from "../../Common/Modals/RatingModel";
import "./viewProposal.css";

function ViewProposal() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let proposals = useSelector((state) => state.proposals);
  let conversations = useSelector((state) => state.conversations.data);
  const [currentProposalId, setCurrentProposalId] = useState(null);
  const [currentSpId, setCurrentSpId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!proposals?.currentProposal?._id) navigate("/MyAds");
    else dispatch(getProposalsRequest(proposals.currentProposal._id));
  }, []);

  const handleHireProposal = (proposalId, Sp_Id) => {
    dispatch(
      hireProposalRequest({
        proposalId: proposalId,
        Sp_Id: Sp_Id,
        currentProposalId: proposals.currentProposal._id,
      })
    );
  };

  const handleTerminateProposal = (proposalId, spId) => {
    setCurrentProposalId(proposalId);
    setCurrentSpId(spId);
    setIsModalOpen(true);
  };

  const currectProposalConversations = useMemo(() => {
    return conversations?.filter(
      (conversation) => conversation.adId === proposals.currentProposal._id
    );
  }, [proposals.currentProposal]);

  const onAlertClose = () => {
    dispatch(clearProposalsAlert());
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTerminateAction = (review, rating) => {
    dispatch(
      terminateProposalRequest({
        proposalId: currentProposalId,
        Sp_Id: currentSpId,
        userReview: review,
        userRating: rating,
        currentProposalId: proposals.currentProposal._id,
      })
    );
    onModalClose();
  };

  const handleMessageCick = (spId, adId) => {
    navigate(`/Echat/${spId}/${adId}`);
  };

  return (
    <>
      <RatingModal
        open={isModalOpen}
        type={"terminate"}
        category={"proposal"}
        action={{ onAction: handleTerminateAction, onModalClose }}
      />
      <SnackbarAlert {...proposals.alert} onClose={onAlertClose} />
      {proposals?.loading && <BackDropLoader />}
      <NewsNav />
      <div class="view_prop_con">
        <div class="prop_nav">
          <ul>
            <li style={{ width: "50%", borderBottom: "3px solid #266386" }}>
              All Proposals ({proposals?.data?.length})
            </li>
          </ul>
        </div>
        <hr style={{ position: "relative", bottom: "18px" }} />
        {proposals.data &&
          proposals.data.map((proposal) => {
            return (
              <div class="prop_view">
                <div class="prop_view1">
                  <div class="prop_dp">
                    <img src="images/user.jpg" alt="" />
                  </div>
                  <div class="prop_info">
                    <div class="prop_view_sm">
                      <span style={{ color: "#024770", fontWeight: "600" }}>
                        {proposal?.Sp_Id?.name}
                      </span>
                      <span
                        style={
                          proposal.isHired || proposal.completionTime
                            ? { color: "red" }
                            : { color: "rgb(107, 107, 107)" }
                        }
                      >
                        {!proposal.isHired && !proposal.completionTime && "Highly Interested"}
                        {proposal.isHired && "Hired"}
                        {proposal.completionTime &&
                          `Terminated on ${new Date(proposal.completionTime)
                            .toLocaleDateString("en-US")
                            .replace(/\//g, "/")}`}
                      </span>
                    </div>
                    <span style={{ fontWeight: "600" }}>{proposal?.Sp_Id?.title}</span>
                    <span style={{ color: "rgb(107, 107, 107)" }}>{proposal?.Sp_Id?.location}</span>
                  </div>
                  <div class="prop_bts">
                    {
                      
                      <button onClick={() => handleMessageCick(proposal.Sp_Id._id, proposal.Ad_Id)}>
                        <p style={{margin:"0 0 0 0"}}>Message</p>
                        <Badge 
                        style={{left:"140px",top:"35px",position:"absolute"}}
                        badgeContent={
                        currectProposalConversations.find(
                          (conversation) =>
                            (conversation.members[0] === proposal?.Sp_Id._id ||
                              conversation.members[1] === proposal?.Sp_Id._id) &&
                            conversation.active === true
                        ) ? "1": null
                      } color="error"></Badge>
                      
                      </button>
                      
                    }
                    {!proposal.isHired && !proposal.completionTime && (
                      <button
                        onClick={() => handleHireProposal(proposal._id, proposal.Sp_Id)}
                        style={{ backgroundColor: "grey" }}
                      >
                        Hire
                      </button>
                    )}
                    {proposal.isHired && !proposal.completionTime && (
                      <button
                        onClick={() => handleTerminateProposal(proposal._id, proposal.Sp_Id)}
                        style={{ backgroundColor: "red" }}
                      >
                        Terminate
                      </button>
                    )}
                  </div>
                </div>
                <div class="prop_view2">
                  <span style={{ fontWeight: "600" }}>${proposal?.budget}</span>
                  <span style={{ fontWeight: "600" }}>
                    ${proposal.Sp_Id.total_earnings}{" "}
                    <span
                      style={{ color: "rgb(107, 107, 107)", fontWeight: "500", marginLeft: "10px" }}
                    >
                      Earned
                    </span>
                  </span>
                </div>
                <div class="prop_view3">
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>Cover Letter</span>
                  <p style={{ position: "relative", top: "15px", fontSize: "15px" }}>
                    {proposal?.coverLetter}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ViewProposal;