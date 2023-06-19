import React, { useState } from "react";
import { useSelector } from "react-redux";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import "./profile.css";
function Profile() {
  const user = useSelector((state) => state.user.data);
  const [tab, setTab] = useState(0);
  return (
    <>
      <NewsNav />
      <body className="profile_body">
        <div class="profile_container">
          <div class="profile_con1">
            <div class="pro_dp">
              <img src="images/user.jpg" alt="" />
            </div>
            <div class="pro_info">
              <div class="pro_name">
                <span>{user?.name}</span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    opacity: "0.8",
                  }}
                >
                  {user?.location}
                </span>
              </div>
            </div>
          </div>
          <div class="profile_con2">
            <div class="profile_con2_incon1">
              <div class="total_ern">
                <div class="total_ern2">
                  <div class="boxes">
                    <span class="bx">${" " + user?.total_earnings || 0}</span>
                    <span class="bx1" style={{ fontSize: "12px" }}>
                      Total Earnings
                    </span>
                  </div>
                  <div class="boxes">
                    <span class="bx">
                      {user?.completedJobs?.length + user?.inProgressJobs?.length}
                    </span>{" "}
                    <span class="bx1" style={{ fontSize: "12px" }}>
                      Total Jobs
                    </span>
                  </div>
                  <div class="boxes">
                    <span class="bx">{user.total_hours || 0}</span>{" "}
                    <span class="bx1" style={{ fontSize: "12px" }}>
                      Total Hours
                    </span>
                  </div>
                </div>
              </div>
              <h4 id="exp_h">Experience</h4>
              {user?.experience?.map((experience) => (
                <div class="exp_con">
                  <span
                    style={{
                      width: "88%",
                      fontSize: "19px",
                      fontWeight: "600",
                    }}
                  >
                    {experience.title}
                  </span>
                  <p style={{ width: "88%", fontSize: "16px" }}>{experience.summary}</p>
                </div>
              ))}
              {user?.experience?.length === 0 && (
                <div class="exp_con">
                  <span
                    style={{
                      width: "88%",
                      fontSize: "19px",
                      fontWeight: "600",
                    }}
                  >
                    {"No Experience to Show"}
                  </span>
                </div>
              )}
            </div>
            <div class="profile_con2_incon2">
              <div class="seller_job_title">
                <div class="seller_title_head">
                  <h3>{user.title}</h3>
                  <span>${user?.per_hour}.00/hr</span>
                </div>
                <p style={{ height: "50%", width: "90%" }}>{user?.description}</p>
              </div>
              <div class="sel_work_history">
                <div class="sel_wh_con1">
                  <span id="whh">Work History</span>
                  <div class="wh_navs">
                    <span
                      onClick={() => setTab(0)}
                      style={tab === 0 ? { borderBottom: "2px solid black" } : {}}
                    >
                      Work Completed ({user?.completedJobs?.length})
                    </span>
                    <span
                      onClick={() => setTab(1)}
                      style={tab === 1 ? { borderBottom: "2px solid black" } : {}}
                    >
                      Work In Progress ({user?.inProgressJobs?.length})
                    </span>
                  </div>
                </div>
                {tab === 0 && (
                  <div class="sel_wh_con2">
                    {user?.completedJobs?.map((job) => (
                      <div class="sel_work">
                        <span
                          style={{
                            width: "90%",
                            fontSize: "17px",
                            fontWeight: 600,
                            color: "#49a800",
                          }}
                        >
                          {job.Ad_Id.title}
                        </span>
                        <div class="sel_whr">
                          <div class="sel_work_rating">
                            <div class="sel_stars">
                              {job?.userRating &&
                                [...Array(job?.userRating)].map((_, index) => (
                                  <i className="bi bi-star-fill" key={index}></i>
                                ))}
                              {job?.userRating &&
                                [...Array(5 - job?.userRating)].map((_, index) => (
                                  <i className="bi bi-star" key={index}></i>
                                ))}
                              {!job?.userRating && "Not Rated"}
                              <span
                                style={{
                                  fontSize: "15px",
                                  marginLeft: "3px",
                                  marginRight: "2px",
                                }}
                              >
                                <b>{job.rating}</b>
                              </span>
                              <span style={{ opacity: 0.7 }}>
                                {job.hiredOn &&
                                  `${new Date(job.hiredOn)
                                    .toLocaleDateString("en-US")
                                    .replace(/\//g, "/")} `}
                                -
                                {job.completionTime &&
                                  ` ${new Date(job.completionTime)
                                    .toLocaleDateString("en-US")
                                    .replace(/\//g, "/")}`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p style={{ width: "90%" }}>
                          <i style={{ fontSize: "13px" }}>
                            {job.userReview ? job.userReview : "No review Given"}
                          </i>
                        </p>
                        <div class="sel_hours">
                          <span>
                            <b>{job.budget + " "} $</b>
                          </span>
                          <span>
                            <b>{"Fixed Price"}</b>
                          </span>
                          <span>
                            <b>{"Fixed Contract"}</b>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 1 && (
                  <div class="sel_wh_con2">
                    {user?.inProgressJobs?.map((job) => (
                      <div class="sel_work">
                        <span
                          style={{
                            width: "90%",
                            fontSize: "17px",
                            fontWeight: 600,
                            color: "#49a800",
                          }}
                        >
                          {job.Ad_Id.title}
                        </span>
                        <div class="sel_whr">
                          <div class="sel_work_rating">
                            <div class="sel_stars">
                              <span
                                style={{
                                  fontSize: "15px",
                                  marginLeft: "3px",
                                  marginRight: "2px",
                                }}
                              >
                                <b>{job.rating}</b>
                              </span>
                              <span style={{ opacity: 0.7 }}>
                                {job.hiredOn &&
                                  `${new Date(job.hiredOn)
                                    .toLocaleDateString("en-US")
                                    .replace(/\//g, "/")} `}{" "}
                                - {" present"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="sel_hours">
                          <span>
                            <b>{job.budget + " "} $</b>
                          </span>
                          <span>
                            <b>{"Fixed Price"}</b>
                          </span>
                          <span>
                            <b>{"Fixed Contract"}</b>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div class="sel_skills">
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    width: "90%",
                    textAlign: "start",
                  }}
                >
                  Skills
                </span>
                <div class="skill_con">
                  {user?.skills?.map((skill) => (
                    <span>{skill}</span>
                  ))}
                  {user?.skills?.length === 0 && (
                    <h6 style={{ display: "flex", minWidth: "200px" }}>No Skills to show</h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Profile;
