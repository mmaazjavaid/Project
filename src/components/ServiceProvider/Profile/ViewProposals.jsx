import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearProposalsAlert,
  getProposalsRequest,
} from "../../../state/ducks/proposals/proposalsSlice";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import SnackbarAlert from "../../Common/Alerts/SnackbarAlert";
import BackDropLoader from "../../Common/Loaders/BackDropLoader";
import "./viewProposal.css";

function ViewProposal() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let proposals = useSelector((state) => state.proposals);
  useEffect(() => {
    if (!proposals?.currentProposal?._id) navigate("/MyAds");
    else dispatch(getProposalsRequest(proposals.currentProposal._id));
  }, []);

  const onAlertClose = () => {
    dispatch(clearProposalsAlert());
  };

  return (
    <>
      <SnackbarAlert {...proposals.alert} onClose={onAlertClose} />
      {proposals?.loading && <BackDropLoader />}
      <NewsNav />
      <div class="view_prop_con">
        <div class="prop_nav">
          <ul>
            <li style={{ width: "50%", borderBottom: "3px solid #266386" }}>
              All Proposals ({proposals?.data?.length})
            </li>
            <li style={{ width: "50%" }}>Messaged (9)</li>
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
                      <span style={{ color: "rgb(107, 107, 107)" }}>Highly Interested</span>
                    </div>
                    <span style={{ fontWeight: "600" }}>{proposal?.Sp_Id?.title}</span>
                    <span style={{ color: "rgb(107, 107, 107)" }}>{proposal?.Sp_Id?.location}</span>
                  </div>
                  <div class="prop_bts">
                    <button>Message</button>
                    <button style={{ backgroundColor: "grey" }}>Hire</button>
                  </div>
                </div>
                <div class="prop_view2">
                  <span style={{ fontWeight: "600" }}>${proposal?.budget}</span>
                  <span style={{ fontWeight: "600" }}>
                    $0{" "}
                    <span
                      style={{ color: "rgb(107, 107, 107)", fontWeight: "500", marginLeft: "10px" }}
                    >
                      earned
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
