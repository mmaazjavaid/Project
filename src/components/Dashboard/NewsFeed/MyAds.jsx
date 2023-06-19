import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import NewsNav from "./NewsNav";
import CircularLoader from "../../Common/Loaders/CircularLoader";
import {
  clearAdsAlert,
  deleteAdRequest,
  getUserAdsRequest,
} from "../../../state/ducks/ads/adsSlice";
import { setCurrentProposalRequest } from "../../../state/ducks/proposals/proposalsSlice";
import ConscentModal from "../../Common/Modals/ConscentModal";
import SnackbarAlert from "../../Common/Alerts/SnackbarAlert";
import "./myads.css";

function MyAds() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const ads = useSelector((state) => state.ads);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onDeleteAction = () => {
    dispatch(deleteAdRequest(deleteId));
    setIsModalOpen(false);
  };
  const handleDeleteAd = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };
  const onModalClose = () => {
    setIsModalOpen(false);
  };
  const [filter, setFilter] = useState({
    category: 0,
    low: 0,
    high: 10000000,
  });

  useEffect(() => {
    dispatch(getUserAdsRequest());
  }, []);

  const filteredAds = useMemo(() => {
    return ads?.data?.filter(
      (ad) =>
        (ad.category === parseInt(filter.category) || parseInt(filter.category) === 0) &&
        ad.budget >= filter.low &&
        ad.budget <= filter.high
    );
  }, [filter, ads]);

  const onAlertClose = () => {
    dispatch(clearAdsAlert());
  };

  const handleSetCurrentAd = (ad_details) => {
    dispatch(setCurrentProposalRequest(ad_details));
    navigate("/ViewProposal");
  };

  return (
    <body>
      <SnackbarAlert {...ads.alert} onClose={onAlertClose} />
      <ConscentModal
        open={isModalOpen}
        type={"delete"}
        category={"ad"}
        action={{ onAction: onDeleteAction, onModalClose }}
      />
      <NewsNav />
      <div class="home_container">
        <div class="feed_container">
          <div class="feed">
            <div
              style={{ borderRadius: "8px", border: "1px solid lightgrey" }}
              class="news_feed_con"
            >
              {ads?.loading && <CircularLoader />}
              {filteredAds?.length === 0 && (
                <h2
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  No Data Found
                </h2>
              )}

              {filteredAds?.map((e, i) => {
                return (
                  <div
                    key={i}
                    style={
                      i === ads.data.length - 1
                        ? { marginBottom: "20px" }
                        : { borderBottom: "1px solid lightgrey" }
                    }
                    class="ad"
                  >
                    <div class="ad_title">
                      <h6>
                        {e.title} &nbsp;{" "}
                        <span
                          onClick={() => handleSetCurrentAd(e)}
                          style={{
                            textDecoration: "underline",
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#2ba8bb",
                          }}
                        >
                          View Proposals
                        </span>{" "}
                      </h6>
                      <div class="like" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <DeleteIcon
                          onClick={() => handleDeleteAd(e?._id)}
                          style={{
                            fontSize: "40px",
                            padding: "0px !important",
                            marginTop: "10px",
                            marginBottom: "0px",
                            marginRight: "0px",
                            color: "#f56a41",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                    <div class="seller_info">
                      <div class="info">
                        <img src="images/user.jpg" alt="" />
                        <span class="seller_name">{e?.user_id?.name || e?.user_id?.username}</span>
                      </div>
                      <span class="budget">{e.budget} $</span>
                    </div>
                    <div class="images">
                      <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                          {e.images.length == 0 ? (
                            <>
                              <div class={`carousel-item}`}>
                                <img
                                  src="images/placeholder.png"
                                  class="d-block w-auto m-auto"
                                  alt="..."
                                />
                              </div>
                            </>
                          ) : (
                            ""
                          )}

                          {e.images.map((img, index) => {
                            return (
                              <div class={`carousel-item ${index == 0 ? "active" : ""}`}>
                                <img src={img} class="d-block w-auto m-auto" alt="..." />
                              </div>
                            );
                          })}
                        </div>
                        <button
                          class="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExample"
                          data-bs-slide="prev"
                        >
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button
                          class="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExample"
                          data-bs-slide="next"
                        >
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                    <div class="description">
                      <b>{e.description}</b>
                    </div>
                    <div class="rating">
                      <span>
                        <b>Rating:</b>
                      </span>
                      <div class="stars">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star"></i>
                      </div>
                      <span id="ratingVal">4/5</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div class="filter">
          <button id="filterbtn">
            <i class="bi bi-list"></i>Filters
          </button>
          <div class="filter_con">
            <h3>Filter By</h3>
            <div class="filter_by_category filters">
              <span>Category</span>
              <select
                style={{
                  borderRadius: "50px",
                  fontSize: "14px",
                  padding: "3px 10px",
                  border: "1px solid #B9B9B9",
                }}
                value={filter.category}
                onChange={(e) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      category: e.target.value,
                    };
                  });
                }}
                type="number"
                placeholder="Category"
              >
                <option value="0">Any</option>
                <option value="1">Modify Products</option>
                <option value="2">Customizeable Products</option>
                <option value="3">Rent Products</option>
              </select>
            </div>
            <div class="filter_by_budget filters">
              <span>Budget</span>
              <div class="budget_range">
                <input
                  type="number"
                  placeholder="Min"
                  value={filter.low}
                  onChange={(e) => {
                    setFilter((prev) => {
                      return {
                        ...prev,
                        low: e.target.value,
                      };
                    });
                  }}
                  name="low"
                />
                <input
                  style={{ padding: "3px 10px" }}
                  type="number"
                  placeholder="Max"
                  value={filter.high}
                  onChange={(e) => {
                    setFilter((prev) => {
                      return {
                        ...prev,
                        high: e.target.value,
                      };
                    });
                  }}
                  name="high"
                />
              </div>
            </div>
            <div class="filter_by_rating filters">
              <span>Rating</span>
              <input type="text" placeholder="Rating" />
            </div>
            <div class="filter_by_location filters">
              <span>Seller Location</span>
              <input type="text" placeholder="Seller Location" />
            </div>
            <div class="filter_by_seller_history filters">
              <span>Seller History</span>
              <div class="sales_range">
                <input style={{ padding: "3px 10px" }} type="number" placeholder="Min Sales" />
                <input style={{ padding: "3px 10px" }} type="number" placeholder="Max Sales" />
              </div>
            </div>
            <button id="results">Show Results</button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default MyAds;
