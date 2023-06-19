import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import BackDropLoader from "../../Common/Loaders/BackDropLoader";
import SnackbarAlert from "../../Common/Alerts/SnackbarAlert";
import {
  clearProposalsAlert,
  createProposalRequest,
} from "../../../state/ducks/proposals/proposalsSlice";
import "./submitProposal.css";

function SubmitProposal() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let proposals = useSelector((state) => state.proposals);
  let currentAd = useSelector((state) => state.ads.currentAd);
  const [proposalInput, setproposalInput] = useState({
    budget: null,
    coverLetter: "",
  });
  const onAlertClose = () => {
    dispatch(clearProposalsAlert());
  };

  return (
    <>
      <SnackbarAlert {...proposals.alert} onClose={onAlertClose} />
      {proposals?.loading && <BackDropLoader />}
      <NewsNav />
      <div class="submit_prop_con">
        <h1 style={{ fontWeight: "600" }}>Submit a Proposal</h1>
        <div class="prop_job_details">
          <h2 style={{ fontSize: "23px", color: "black", marginTop: "15px", fontWeight: "600" }}>
            Ad details
          </h2>
          <div class="prop_des_con">
            <div class="prop_des_con1">
              <h4 class="prop_job_title" style={{ fontWeight: "600" }}>
                {currentAd.title}
              </h4>
              <div class="prop_job_title2">
                <span>Front-end Development</span>
                <p>
                  Posted on
                  {` ${new Date(currentAd.createdAt)
                    .toLocaleDateString("en-US")
                    .replace(/\//g, "/")} `}
                </p>
              </div>
              <div class="prop_job_desp">{currentAd.description}</div>
            </div>
          </div>
          <div class="prop_skills">
            <h3 style={{ fontSize: "19px", marginTop: "10px", fontWeight: "600" }}>
              Skills and expertise
            </h3>
            <div class="skill_con2">
              <span>Web Application</span>
              <span>HTML</span>
              <span>Node</span>
            </div>
          </div>
        </div>
        <div class="prop_terms">
          <h2 style={{ fontSize: "23px", color: "black", marginTop: "15px", fontWeight: "600" }}>
            Terms
          </h2>
          <div class="prop_bid" style={{ borderBottom: "1px solid #D5E0D5" }}>
            <div class="prop_bid1">
              <span style={{ fontSize: "16px" }}>
                What is the full amount you'd like to bid for this job?
              </span>
              <span style={{ fontSize: "17px" }}>Bid</span>
              <span style={{ fontSize: "15px", color: "#5E6D55" }}>
                Total amount the client will see on your proposal
              </span>
            </div>
            <div class="prop_bid2">
              <input
                type="number"
                name="budget"
                id="budget"
                value={proposalInput.budget}
                onChange={(e) =>
                  setproposalInput((prevProposalInput) => ({
                    ...prevProposalInput,
                    budget: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div class="prop_bid" style={{ height: "24%", borderBottom: "1px solid #D5E0D5" }}>
            <div class="prop_bid1">
              <span style={{ fontSize: "17px" }}>10% Freelancer Service Fee</span>
            </div>
            <div class="prop_bid2">
              <span style={{ fontSize: "18px", color: "#9AAA97", marginRight: "170px" }}>
                -${proposalInput.budget && (proposalInput.budget * 0.1).toFixed(0)}
              </span>
            </div>
          </div>
          <div class="prop_bid">
            <div class="prop_bid1">
              <span style={{ fontSize: "17px" }}>You'll receive</span>
              <span style={{ fontSize: "15px", color: "#5E6D55" }}>
                The estimated amount you will receive after service fee
              </span>
            </div>
            <div class="prop_bid2">
              <input
                disabled
                type="number"
                name=""
                id=""
                value={proposalInput.budget ? (proposalInput.budget * 0.9).toFixed(0) : 0}
              />
            </div>
          </div>
        </div>
        <div class="prop_det">
          <h2 style={{ fontSize: "23px", color: "black", marginTop: "15px", fontWeight: "600" }}>
            Additional Details
          </h2>
          <div class="prop_cover">
            <span style={{ fontWeight: "600", marginBottom: "10px" }}>Cover Letter</span>
            <textarea
              name="coverLetter"
              id="coverLetter"
              cols="30"
              rows="10"
              value={proposalInput.coverLetter}
              onChange={(e) =>
                setproposalInput((prevProposalInput) => ({
                  ...prevProposalInput,
                  coverLetter: e.target.value,
                }))
              }
            >
              {proposalInput.coverLetter}
            </textarea>
          </div>
        </div>
        <div class="prop_btns">
          <button
            onClick={() =>
              dispatch(
                createProposalRequest({
                  Ad_Id: currentAd._id,
                  Sp_Id: localStorage.getItem("user_id"),
                  ...proposalInput,
                  budget: (proposalInput.budget * 0.9).toFixed(0),
                })
              )
            }
          >
            Submit proposal
          </button>
          <button
            onClick={() => navigate("/News")}
            style={{ backgroundColor: "rgb(137, 137, 137)", position: "relative", right: "20px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default SubmitProposal;
