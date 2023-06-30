import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import SnackbarAlert from "../../Common/Alerts/SnackbarAlert";
import BackDropLoader from "../../Common/Loaders/BackDropLoader";
import {
  clearProposalsAlert,
  getContractsRequest,
} from "../../../state/ducks/proposals/proposalsSlice";
import "./contracts.css";

function Contracts() {
  let dispatch = useDispatch();
  const proposals = useSelector((state) => state.proposals);
  const user = useSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(getContractsRequest(user._id));
  }, []);

  const onAlertClose = () => {
    dispatch(clearProposalsAlert());
  };
  console.log(proposals);
  return (
    <>
      <SnackbarAlert {...proposals.alert} onClose={onAlertClose} />
      {proposals?.loading && <BackDropLoader />}
      <NewsNav />
      <div class="contracts_con">
        <div class="contracts_head">
          <div class="contracts_spans">
            <h3>Contracts</h3>
          </div>
          <div class="contracts_search_con">
            <input type="text" placeholder="Search Contracts" />
            <i class="bi bi-search"></i>
          </div>
        </div>
        {proposals.contracts.map((contract) => {
          return (
            <div class="contract_des">
              <div class="contracts_des1">
                <div></div>
                <div id="cont_des">{contract.Ad_Id.title}</div>
                <div id="cont_hir">Hired by {contract?.Ad_Id?.user_id?.name}</div>
                <div id="cont_prog">
                  {!contract.completionTime && "Contract in progress"}
                  <p style={{ color: "red" }}>
                    {contract.completionTime &&
                      `Contract Terminated on ${new Date(contract.completionTime)
                        .toLocaleDateString("en-US")
                        .replace(/\//g, "/")}`}
                  </p>
                </div>
              </div>
              <div class="contracts_des2">
                <span>
                  <span id="cont_pr">Budget :&nbsp;&nbsp; ${contract.budget}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Contracts;
