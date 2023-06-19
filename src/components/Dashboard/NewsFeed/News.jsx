import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "@mui/material";
import { getAdsRequest } from "../../../state/ducks/ads/adsSlice";
import AdDetails from "../CreateAd/AdDetails";
import NewsNav from "./NewsNav";
import CircularLoader from "../../Common/Loaders/CircularLoader";
import "./news.css";

function News() {
  let dispatch = useDispatch();
  const ads = useSelector((state) => state.ads);
  const user = useSelector((state) => state.user.data);
  const [filter, setFilter] = useState({
    category: 0,
    low: 0,
    high: 10000000,
  });
  const filteredAds = useMemo(() => {
    return ads?.data?.filter(
      (ad) =>
        (ad.category === parseInt(filter.category) || parseInt(filter.category) === 0) &&
        ad.budget >= filter.low &&
        ad.budget <= filter.high
    );
  }, [filter, ads]);
  const [ads_details, setads_details] = useState({
    budget: 999,
    category: 2,
    createdAt: "",
    images: [],
    likes: 1,
    skills_required: [],
    tags: [],
    title: "Ad without image",
    updatedAt: "",
    user_id: {
      total_jobs: Array(0),
      _id: "",
      email: "",
      username: "",
      phone: "",
    },
    __v: 0,
    _id: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getAdsRequest(user._id));
  }, []);

  const handleButtonClick = (ad) => {
    if (isVisible === false) setads_details(ad);
    setIsVisible(!isVisible);
  };
  return (
    <body>
      <NewsNav />
      <div class="home_container">
        <div class="feed_container">
          <div class="feed">
            <div
              style={{ borderRadius: "20px", border: "1px solid lightgrey" }}
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
                      i === ads.length - 1
                        ? { marginBottom: "20px" }
                        : { borderBottom: "1px solid lightgrey" }
                    }
                    class="ad"
                  >
                    <div class="news_ad_title">
                      <h6>
                        {e.title} &nbsp;{" "}
                        {user.roll === 2 && (
                          <span
                            onClick={() => handleButtonClick(e)}
                            style={{
                              textDecoration: "underline",
                              fontSize: "14px",
                              fontWeight: "normal",
                              color: "#2ba8bb",
                            }}
                          >
                            View details
                          </span>
                        )}{" "}
                      </h6>
                      <div class="like">
                        <i onClick={""} class="bi bi-hand-thumbs-up-fill"></i>
                        <i onClick={""} class="bi bi-hand-thumbs-down-fill"></i>
                      </div>
                    </div>
                    <div class="seller_info">
                      <div class="info">
                        <img src="images/user.jpg" alt="" />
                        <span class="seller_name">{e?.user?.name || e?.user?.username}</span>
                      </div>
                      <span class="budget">{e.budget} $</span>
                    </div>
                    <div class="images">
                      <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                          {e.images.length === 0 ? (
                            <div class={`carousel-item}`}>
                              <img
                                src="images/placeholder.png"
                                class="d-block w-auto m-auto"
                                alt="..."
                              />
                            </div>
                          ) : (
                            <>
                              {e.images.map((image, index) => {
                                return (
                                  <div class={`carousel-item ${index === 0 ? "active" : ""} `}>
                                    <img src={e.images[index]} class="d-block w-100" alt="..." />
                                  </div>
                                );
                              })}
                            </>
                          )}
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
                    <div class="description" style={{ marginTop: "10px" }}>
                      <b>{e.description}</b>
                    </div>
                    <div class="rating">
                      <span>
                        <b>Rating:</b>
                      </span>
                      {e?.user?.rating ? (
                        <>
                          <div class="stars">
                            {[...Array(e.user.rating)].map((_, index) => (
                              <i className="bi bi-star-fill" key={index}></i>
                            ))}
                            {[...Array(5 - e.user.rating)].map((_, index) => (
                              <i className="bi bi-star" key={index}></i>
                            ))}
                          </div>
                          <span id="ratingVal">{e.user.rating}/5</span>
                        </>
                      ) : (
                        <div class="stars" style={{ marginTop: "18px" }}>
                          <p>Not Rated </p>
                        </div>
                      )}
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
                <option value={0}>Any</option>
                <option value={1}>Modify Products</option>
                <option value={2}>Customizeable Products</option>
                <option value={3}>Rent Products</option>
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
                <input type="number" placeholder="Min Sales" />
                <input type="number" placeholder="Max Sales" />
              </div>
            </div>
            <button id="results">Show Results</button>
          </div>
        </div>

        <Fade in={isVisible} timeout={600}>
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <AdDetails ad_details={ads_details} handleButtonClick={handleButtonClick} />
          </div>
        </Fade>
      </div>
    </body>
  );
}

export default News;
