import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import { loginRequest } from "../../state/ducks/users/userSLice";
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
    if (user.data._id) navigate("/News");
  }, [user]);

  return (
    <body>
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
          }}
        >
          <DotLoader color="#36d7b7" size={100} />
        </div>
      ) : (
        ""
      )}
      <div class="login_container">
        <div class="login_image">
          <img src="images/pic3.jpg" alt="" />
        </div>
        <div class="login_form_con">
          <div class="login_text">
            <h2>Welcome Back :)</h2>
            <p>
              To keep connected with us please login with your personal
              information by email address and password 🔔
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
                Remember Me
              </div>
              <div class="login_forgot">
                <span>Forgot Password?</span>
              </div>
            </div>
            <div class="login_btns">
              {false ? (
                ""
              ) : (
                <button class="login_login" onClick={handleFormSubmit}>
                  Login Now
                </button>
              )}
              <button class="login_create">
                <Link
                  to={"/Signup"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Create Account
                </Link>
              </button>
            </div>
            <p id="join">Or you can join with</p>
            <div class="login_icons">
              <i class="bi login_bi-google"></i>
              <i class="bi login_bi-facebook"></i>
              <i class="bi login_bi-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
