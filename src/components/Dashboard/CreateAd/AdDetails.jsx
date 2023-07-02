import React from "react";
import "./addetails.css";
import { useNavigate } from "react-router-dom";
import { setCurrentAdRequest } from "../../../state/ducks/ads/adsSlice";
import { useDispatch } from "react-redux";
function AdDetails({ ad_details, handleButtonClick }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const handleSetCurrentAd = () => {
    dispatch(setCurrentAdRequest(ad_details));
    navigate("/SubmitProposal");
  };
  return (
    <div class="bodyofaddetails">
      <div class="ad_details_con">
        <i
          style={{ marginTop: "20px", display: "flex" }}
          onClick={() => handleButtonClick(ad_details)}
          class="bi bi-arrow-left-circle-fill"
        ></i>
        <div class="ad_details_con2">
          <div class="ad_con1">
            <div class="ad_images_con" style={{width:"auto"}}>
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  {ad_details.images.length == 0 ? (
                    <div class={`carousel-item}`}>
                      <img  style={{ height: "360px" }} src="images/placeholder.png" class="d-block w-auto m-auto" alt="..." />
                    </div>
                  ) : (
                    <>
                      {[...Array(ad_details.images[0])].map((_, index) => (
                        <div class={`carousel-item active`}>
                          <img
                            src={ad_details.images[index]}
                            style={{ height: "360px" }}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      ))}
                      {[...Array(ad_details.images)].map((_, index) => (
                        <div class={`carousel-item `}>
                          <img src={ad_details.images[index]} class="d-block w-100" alt="..." />
                        </div>
                      ))}
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
            <div class="ad_des_con">
              <div class="ad_des_con2">
                <span style={{ marginBottom: "10px" }}>Details</span>
                <div class="price_det">
                  <span style={{ opacity: "0.7" }}>Price</span>
                  <span>{ad_details.budget}</span>
                  <span style={{ opacity: "0.7" }}>Condition</span>
                  <span>Used</span>
                </div>
                <hr />
                <span>Description</span>
                <p>{ad_details.description}</p>
              </div>
            </div>
            <div class="related_con">
              <span>Related Ads</span>
              <div class="ad_cards">
                <div class="card">
                  <div class="ad_img">
                    <img src="images/pic4.jpg" alt="" />
                  </div>
                  <div class="ad_titleLike">
                    <span class="ad_title_rel">Ad Title</span>
                    <i class="bi bi-heart"></i>
                  </div>
                  <span class="ad_price_rel">Rs 3000</span>
                  <span class="ad_location">Careem Block, Lahore</span>
                </div>

                <div class="card">
                  <div class="ad_img">
                    <img src="images/pic4.jpg" alt="" />
                  </div>
                  <div class="ad_titleLike">
                    <span class="ad_title_rel">Ad Title</span>
                    <i class="bi bi-heart"></i>
                  </div>
                  <span class="ad_price_rel">Rs 3000</span>
                  <span class="ad_location">Careem Block, Lahore</span>
                </div>

                <div class="card">
                  <div class="ad_img">
                    <img src="images/pic4.jpg" alt="" />
                  </div>
                  <div class="ad_titleLike">
                    <span class="ad_title_rel">Ad Title</span>
                    <i class="bi bi-heart"></i>
                  </div>
                  <span class="ad_price_rel">Rs 3000</span>
                  <span class="ad_location">Careem Block, Lahore</span>
                </div>

                <div class="card">
                  <div class="ad_img">
                    <img src="images/pic4.jpg" alt="" />
                  </div>
                  <div class="ad_titleLike">
                    <span class="ad_title_rel">Ad Title</span>
                    <i class="bi bi-heart"></i>
                  </div>
                  <span class="ad_price_rel">Rs 3000</span>
                  <span class="ad_location">Careem Block, Lahore</span>
                </div>

                <div class="card">
                  <div class="ad_img">
                    <img src="images/pic4.jpg" alt="" />
                  </div>
                  <div class="ad_titleLike">
                    <span class="ad_title_rel">Ad Title</span>
                    <i class="bi bi-heart"></i>
                  </div>
                  <span class="ad_price_rel">Rs 3000</span>
                  <span class="ad_location">Careem Block, Lahore</span>
                </div>
              </div>
            </div>
          </div>
          <div class="ad_con2">
            <div class="price_con2">
              <div class="conn1">
                <div class="lil_con">
                  <span style={{fontWeight: "700"}} id="pr">Rs {ad_details.budget}</span>
                  <span id="adt">{ad_details.title}</span>
                </div>
                <div class="iconn">
                  <i class="bi bi-share-fill"></i>
                  <i class="bi bi-heart"></i>
                </div>
              </div>
              <div class="conn2">
                <span>{ad_details.location}</span>
                <span>20 hours ago</span>
              </div>
            </div>
            <div class="sell_des_con">
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  width: "90%",
                  textAlign: "start",
                }}
              >
                Seller Description
              </span>
              <div
                style={{
                  width: "90%",
                  height: "30%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                class="sel_id"
              >
                <div class="sel_info">
                  <div class="sel_dp">
                    <img
                      style={{ height: "100%", width: "100%", borderRadius: "50px" }}
                      src="images/user.jpg"
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      width: "68%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "space-evenly",
                    }}
                    class="sel_name"
                  >
                    <span>{ad_details.user_id.username}</span>
                    <span style={{ fontSize: "11.5px", opacity: "0.7" }}>
                      Member since July 2021
                    </span>
                  </div>
                </div>
                <i class="bi bi-arrow-right-short"></i>
              </div>
              <button style={{ margin: "auto" }}>Chat with Seller</button>
              <button
                style={{
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  style={{ marginLeft: "0", marginRight: "10px",color:"white" }}
                  class="bi bi-telephone-fill"
                ></i>
                Call
              </button>
            </div>
            <div class="buy_now">
              <button
                onClick={() => handleSetCurrentAd(ad_details._id)}
                style={{ marginLeft: "25px" }}
              >
                Apply Now
              </button>
            </div>
            <div class="posted">
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  width: "90%",
                  textAlign: "start",
                }}
              >
                Posted In
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "90%",
                }}
                class="loc"
              >
                <span style={{ fontSize: "13px", opacity: "0.7" }}>{ad_details.location}</span>
                <span style={{ fontSize: "13px", fontWeight: "700" }}>
                  Ad ID {ad_details._id.substring(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetails;
