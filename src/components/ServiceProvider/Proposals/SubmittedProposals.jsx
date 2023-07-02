import React, { useEffect } from "react";
import moment from "moment";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import "./submittedProposals.css";
import { useDispatch, useSelector } from "react-redux";
import SnackbarAlert from "../../Common/Alerts/SnackbarAlert";
import BackDropLoader from "../../Common/Loaders/BackDropLoader";
import {
  clearProposalsAlert,
  getProposalsRequest,
} from "../../../state/ducks/proposals/proposalsSlice";

function SubmittedProposals() {
  let dispatch = useDispatch();
  let proposals = useSelector((state) => state.proposals);
  useEffect(() => {
    dispatch(
      getProposalsRequest({
        role: 2,
      })
    );
  }, []);
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const onAlertClose = () => {
    dispatch(clearProposalsAlert());
  };

  return (
    <>
      <SnackbarAlert {...proposals.alert} onClose={onAlertClose} />
      {proposals?.loading && <BackDropLoader />}
      <NewsNav />
      <div class="sub_prop_con">
        <div class="sub_prop_head">
          <h1 style={{ marginTop: "0" }}>Submitted Proposals ({proposals.data.length})</h1>
        </div>
        {proposals.data.map((proposal) => {
          return (
            <div class="sub_prop2">
              <div class="sub_prop">
                <div class="sub_prop_time">
                  <span style={{ fontSize: "17px", fontWeight: "600" }}>
                    Initiated {formatCreatedAt(proposal?.createdAt)}
                  </span>
                  <span style={{ fontSize: "15px", color: "rgb(102, 102, 102)" }}>
                    {moment(proposal?.createdAt).fromNow()}
                  </span>
                </div>
                <span
                  className="sub_title_prop1"
                  style={{
                    width: "70%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <span
                    className="sub_title_prop"
                    style={{
                      color: "#266386",
                      fontSize: "20px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {proposal?.Ad_Id.title}
                  </span>
                </span>
                <span className="sub_prof" style={{ color: "rgb(102, 102, 102)" }}>
                  General Profile
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SubmittedProposals;
