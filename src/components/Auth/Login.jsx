import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackDropLoader from "../Common/Loaders/BackDropLoader";
import { clearUserAlert, loginRequest } from "../../state/ducks/users/userSLice";
import SnackbarAlert from "../Common/Alerts/SnackbarAlert";
import "./login.css";

function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [inputs, setinputs] = useState({
    email: null,
    password: null,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setinputs((prev) => {
      return {
        ...prev,
      };
    });
    dispatch(loginRequest(inputs));
  };

  useEffect(() => {
    if (user?.data?._id) navigate("/News");
  }, [user]);

  const onAlertClose = () => {
    dispatch(clearUserAlert());
  };

  return (
    <body>
      {user?.loading && <BackDropLoader />}
      <SnackbarAlert {...user.alert} onClose={onAlertClose} />
      <div class="login_container">
        <div class="login_image">
          <img src="images/login.jpg" alt="" />
        </div>
        <div class="login_form_con" style={{marginTop:"150px"}}>
          <div class="login_text">
            <h2>Welcome Back :)</h2>
            <p>
              To keep connected with us please login with your personal information by email address
              and password 🔔
            </p>
          </div>
          <div class="login_inputs">
            <div class="login_input_con">
              <i class="login_bi bi-envelope"></i>
              <input
                class="login_creds"
                type="text"
                name="email"
                value={inputs.email}
                onChange={(e) =>
                  setinputs((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
                placeholder="Email Address"
              />
            </div>
            <div class="login_input_con">
              <i class="login_bi bi-lock"></i>
              <input
                class="login_creds"
                type="password"
                name="password"
                value={inputs.password}
                onChange={(e) =>
                  setinputs((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
                placeholder="Password"
              />
            </div>
            <div class="login_remember">
              <div class="login_rem">
                <input class="login_checks" type="checkbox" name="" id="" />
                <span style={{marginLeft:"8px"}}>Remember Me</span>
              </div>
              <div class="login_forgot">
                <span>Forgot Password?</span>
              </div>
            </div>
            <div class="login_btns">
              {false ? (
                ""
              ) : (
                <button style={{borderRadius:"50px"}} class="login_login" onClick={handleFormSubmit}>
                  Login Now
                </button>
              )}
              <button class="login_create" style={{borderRadius:"50px",position:"relative",right:"25px"}}>
                <Link to={"/Signup"} style={{ textDecoration: "none", color: "black" }}>
                  Create Account
                </Link>
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
