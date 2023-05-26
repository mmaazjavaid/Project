import React, { useState } from "react";
import { useSelector } from "react-redux";
import NewsNav from "../../Dashboard/NewsFeed/NewsNav";
import "./edit_profile.css";
import EditProfileForm from "../../Common/EditForms/EditProfileForm";

function EditProfile() {
  const user = useSelector((state) => state.user.data);
  const [editForm, setEditForm] = useState({
    open: false,
    type: null,
  });
  return (
    <>
      <NewsNav />
      <EditProfileForm {...editForm} setEditForm={setEditForm} />
      <body className="profile_body">
        <div class="profile_container">
          <div class="profile_con1">
            <div class="pro_dp">
              <img src="images/user.jpg" alt="" />
            </div>
            <div class="pro_info">
              <div class="pro_name">
                <span>
                  {user?.name}{" "}
                  <i
                    onClick={() =>
                      setEditForm((prevEditForm) => ({
                        ...prevEditForm,
                        type: "basicInfo",
                        open: true,
                      }))
                    }
                    style={{ fontSize: "13px" }}
                    id="edit_i"
                    class="bi bi-pencil-fill"
                  ></i>
                </span>
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
                    <span class="bx">${user?.total_earnings || 0}</span>
                    <span class="bx1">Total Earnings</span>
                  </div>
                  <div class="boxes">
                    <span class="bx">{user?.total_jobs?.length}</span>{" "}
                    <span class="bx1">Total Jobs</span>
                  </div>

                  <div class="boxes">
                    <span class="bx">{user.total_hours || 0}</span>{" "}
                    <span class="bx1">Total Hours</span>
                  </div>
                </div>
              </div>
              <h4 id="exp_h">
                Experience{" "}
                <i
                  style={{ fontSize: "13px" }}
                  id="edit_i"
                  class="bi bi-pencil-fill"
                ></i>
              </h4>
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
                  <p style={{ width: "88%", fontSize: "16px" }}>
                    {experience.summary}
                  </p>
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
                  <h3>
                    {user.title || "Ad your profile title"}
                    <i
                      onClick={() =>
                        setEditForm((prevEditForm) => ({
                          ...prevEditForm,
                          type: "profileInfo",
                          open: true,
                        }))
                      }
                      style={{
                        position: "relative",
                        top: "7px",
                        fontSize: "13px",
                      }}
                      id="edit_i"
                      class="bi bi-pencil-fill"
                    ></i>
                  </h3>
                  <span>${user?.per_hour}.00/hr</span>
                </div>
                <p style={{ width: "90%" }}>{user?.description}</p>
              </div>
              <div class="sel_work_history">
                <div class="sel_wh_con1">
                  <span id="whh">Work History</span>
                  <div class="wh_navs">
                    <span style={{ borderBottom: "2px solid black" }}>
                      Work Completed (10)
                    </span>
                    <span>Work In Progress (7)</span>
                  </div>
                </div>
                <div class="sel_wh_con2">
                  {user?.total_jobs?.map((job) => (
                    <div class="sel_work">
                      <span
                        style={{
                          width: "90%",
                          fontSize: "17px",
                          fontWeight: 600,
                          color: "#49a800",
                        }}
                      >
                        {job.title}
                      </span>
                      <div class="sel_whr">
                        <div class="sel_work_rating">
                          <div class="sel_stars">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
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
                              {job.startDate} - {job.endDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p style={{ width: "90%" }}>
                        <i style={{ fontSize: "13px" }}>{job.customerReview}</i>
                      </p>
                      <div class="sel_hours">
                        <span>
                          <b>{job.totalEarning}</b>
                        </span>
                        <span>
                          <b>{job.rate}</b>/hr
                        </span>
                        <span>
                          <b>{job.totalHours}</b> hours
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
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
                  Skills{" "}
                  <i
                    onClick={() =>
                      setEditForm((prevEditForm) => ({
                        ...prevEditForm,
                        type: "skillsInfo",
                        open: true,
                      }))
                    }
                    style={{ fontSize: "13px" }}
                    id="edit_i"
                    class="bi bi-pencil-fill"
                  ></i>
                </span>
                <div class="skill_con">
                  {user?.skills?.map((skill) => (
                    <span>{skill}</span>
                  ))}
                  {user?.skills?.length === 0 && (
                    <h6 style={{ display: "flex", minWidth: "200px" }}>
                      No Skills to show
                    </h6>
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

export default EditProfile;
