import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { logoutRequest } from "../../../state/ducks/users/userSLice";

function NewsNav() {
  let dispatch = useDispatch();
  return (
    <>
      {false ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            background: "white",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5,
          }}
        >
          <DotLoader color="#36d7b7" size={100} />
        </div>
      ) : (
        ""
      )}
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <span className="home_title">E-Market</span>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/News">
                  <Link
                    to={"/News"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Home
                  </Link>
                </a>
              </li>
              {/* <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services/Sections
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Auction Products</a></li>
                <li><a class="dropdown-item" href="#">Modify Products</a></li>
                <li><a class="dropdown-item" href="#">Customizeable Products</a></li>
                <li><a class="dropdown-item" href="#">Rent Products</a></li>
              </ul>
            </li> */}
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <Link
                    to={"/CreateAd"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Post Ad
                  </Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <Link
                    to={"/MyAds"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    My Ads
                  </Link>
                </a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <i class="bi bi-search"></i>
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <div class="user_icons">
              <i class="bi bi-inbox"></i> <i class="bi bi-bell"></i>
              <div class="dropdown">
                <div class="dp">
                  <img src="images/user.jpg" alt="" />
                </div>
                <div class="dropdown-content right">
                  <Link to={"/Profile"}>Profile</Link>
                  <Link to={"/EditProfile"}>Edit Profile</Link>
                  <a href="#" onClick={() => dispatch(logoutRequest())}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NewsNav;