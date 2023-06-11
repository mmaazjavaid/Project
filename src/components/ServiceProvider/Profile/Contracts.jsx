import React from "react";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import "./contracts.css";

function Contracts() {
  return (
    <>
      <NewsNav />
      <div class="contracts_con">
        <div class="contracts_head">
          <div class="contracts_spans">
            <h3>Contracts</h3>
            <div>View all & ended contracts</div>
          </div>
          <div class="contracts_search_con">
            <input type="text" placeholder="Search Contracts" />
            <i class="bi bi-search"></i>
          </div>
        </div>
        <div class="contract_des">
          <div class="contracts_des1">
            <div></div>
            <div id="cont_des">Designer needed to help with preentations</div>
            <div id="cont_hir">Hired by Umer Waqar</div>
            <div id="cont_prog">Contract in progress</div>
          </div>
          <div class="contracts_des2">
            <span>
              <span id="cont_pr">$50.00</span> | $10.00/hr{" "}
            </span>
            <span>$00.00 hrs of 20 hrs this week</span>
          </div>
        </div>
        <div class="contract_des">
          <div class="contracts_des1">
            <div></div>
            <div id="cont_des">Designer needed to help with preentations</div>
            <div id="cont_hir">Hired by Umer Waqar</div>
            <div id="cont_prog">Contract in progress</div>
          </div>
          <div class="contracts_des2">
            <span>
              <span id="cont_pr">$50.00</span> | $10.00/hr{" "}
            </span>
            <span>$00.00 hrs of 20 hrs this week</span>
          </div>
        </div>
        <div class="contract_des">
          <div class="contracts_des1">
            <div></div>
            <div id="cont_des">Designer needed to help with preentations</div>
            <div id="cont_hir">Hired by Umer Waqar</div>
            <div id="cont_prog">Contract in progress</div>
          </div>
          <div class="contracts_des2">
            <span>
              <span id="cont_pr">$50.00</span> | $10.00/hr{" "}
            </span>
            <span>$00.00 hrs of 20 hrs this week</span>
          </div>
        </div>
        <div class="contract_des">
          <div class="contracts_des1">
            <div></div>
            <div id="cont_des">Designer needed to help with preentations</div>
            <div id="cont_hir">Hired by Umer Waqar</div>
            <div id="cont_prog">Contract in progress</div>
          </div>
          <div class="contracts_des2">
            <span>
              <span id="cont_pr">$50.00</span> | $10.00/hr{" "}
            </span>
            <span>$00.00 hrs of 20 hrs this week</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contracts;
