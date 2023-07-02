import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./home.css";

function Home() {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.data?._id) navigate("/News");
  }, [user]);

  return (
    <body>
      <ul className="home_navbar">
        <span className="home_title">E-Market</span>
        <div className="home_navlinks">
          <Link
            to={"Signup_Service_Provider"}
            style={{ textDecoration: "none" }}
          >
            <li className="home_navs" style={{ marginRight: "50px" }}>
              Join as a Service provider
            </li>
          </Link>
          <Link to={"/Login"} style={{ textDecoration: "none" }}>
            <li class="home_navs">Login</li>
          </Link>
        </div>
        <Link to={"/Signup"}>
          <button className="home_btn1">Get Started</button>
        </Link>
      </ul>
      <div className="home_container" style={{ backgroundImage: `url("images/home1.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className="home_con">
          <div className="home_text">
            <h1>
              World's best Market Place for Online and Offline Servicing, ready to serve you anytime
              anywhere.
            </h1>
            <h2>
              Join us as a User or Service provider to show case you Amazing
              Products ,services and Talent
            </h2>
            <Link to={"/Signup"}>
              <button className="home_btn2">Get Started</button>
            </Link>
          </div>
          <div className="home_image" >

          </div>
        </div>
      </div>
      <hr className="hr" />




      <div className="laptop_service">
        <div className="twoText">
          <div className="twoOne">
            You Can Get Amazing Services From This Plateform</div>
          <div className="twoTwo">
            Alot of Expert Service Providers Give You Services Like some of the following :
          </div>
        </div>

        <div className="twoImage">
          <div className="img">
            <img src="images/homeFurniture.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}> Furniture Customization Services</p>
            <hr style={{ margin: "1px" }} />

          </div>
          <div className="img">
            <img src="images/computer.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}> Computer Customization Services</p>
            <hr style={{ margin: "1px" }} />

          </div>
          <div className="img">
            <img src="images/software.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}> Software Development Services</p>
            <hr style={{ margin: "1px" }} />
          </div>
          <div className="img">
            <img src="images/rent.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}>Car Renting Services</p>
            <hr style={{ margin: "1px" }} />

          </div>
          <div className="img">
            <img src="images/modify1.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}> Professional Car Modification Services</p>
            <hr style={{ margin: "1px" }} />

          </div>
          <div className="img">
            <img src="images/houseRent.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}> House Renting Services</p>
            <hr style={{ margin: "1px" }} />

          </div>
          <div className="img">
            <img src="images/sportsCustomization.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}> Clothe or Sports Product Customization Services</p>
            <hr style={{ margin: "1px" }} />

          </div>
          <div className="img">
            <img src="images/LaptopModification.jpg" alt="" />
            <p style={{ margin: "0px", marginTop: "3px" }}> Laptop Modification Services</p>
            <hr style={{ margin: "1px" }} />

          </div>

        </div>
      </div>
<hr className="hr hr2"/>
      <div className="join" >
        <h1>Join Our Family and Shape the Future Together!</h1>
        <div className="joinBox">
          <div className="joinSp" >

           <div style={{fontWeight:"bold",fontSize:"25px"}}>
           Join As Service Provider
            </div> 
            <img  src="images/spIconOnly.png" alt="" />
            <Link to={"Signup_Service_Provider"}>
              <button className="home_btn2" style={{marginRight:"0px"}}>SIGN UP </button>
            </Link>
          </div>

          <div className="joinUser" style={{fontWeight:"bold",fontSize:"25px"}}>
            Join As User
            <img src="images/userIconOnly.png" alt="" />
            <Link to={"/Signup"} >
              <button  className="home_btn2" style={{marginRight:"0px"}}>SIGN UP</button>
            </Link>
          </div>
        </div>
      </div>


    </body>
  );
}

export default Home;
