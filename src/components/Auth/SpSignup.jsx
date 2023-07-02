import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserAlert, registerRequest } from "../../state/ducks/users/userSLice";
import BackDropLoader from "../Common/Loaders/BackDropLoader";
import SnackbarAlert from "../Common/Alerts/SnackbarAlert";
import "./signup.css";

function SpSignup() {
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [inputs, setinputs] = useState({
    name: null,
    username: null,
    phone: null,
    email: null,
    password: null,
    roll: 2,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setinputs((prev) => {
      return {
        ...prev,
      };
    });
    dispatch(registerRequest(inputs));
  };

  const onAlertClose = () => {
    dispatch(clearUserAlert());
  };

  return (
    <body>
      {user?.loading && <BackDropLoader />}
      <SnackbarAlert {...user.alert} onClose={onAlertClose} />
      <div class="signup_container">
        <div class="signup_image">
          <img style={{width:"auto",marginLeft:"70px"}} src="images/Sp.jpg" alt="" />
        </div>
        <div class="signup_form_con" style={{marginTop:"100px"}}>
          <div class="signup_text">
            <h2>Join us today! :)</h2>
            <p>To create account please provide us the following information</p>
          </div>
          <div class="signup_inputs">
            <div class="signup_input_con">
              <i class="signup_bi bi-person"></i>
              <input
                class="signup_creds"
                placeholder="Name"
                type="text"
                name="name"
                value={inputs.name}
                onChange={(e) =>
                  setinputs((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  })
                }
                label="Name"
              />
            </div>
            <div class="signup_input_con">
              <i class="signup_bi bi-person"></i>
              <input
                class="signup_creds"
                type="text"
                name="username"
                value={inputs.username}
                onChange={(e) =>
                  setinputs((prev) => {
                    return {
                      ...prev,
                      username: e.target.value,
                    };
                  })
                }
                placeholder="Username"
              />
            </div>
            <div class="signup_input_con">
              <i class="signup_bi bi-phone"></i>
              <input
                class="signup_creds"
                type={"tel"}
                name="phone"
                value={inputs.phone}
                onChange={(e) =>
                  setinputs((prev) => {
                    return {
                      ...prev,
                      phone: e.target.value,
                    };
                  })
                }
                placeholder="Phone"
              />
            </div>
            <div class="signup_input_con">
              <i class="signup_bi bi-envelope"></i>
              <input
                class="signup_creds"
                type="email"
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
            <div class="signup_input_con">
              <i class="signup_bi bi-lock"></i>
              <input
                class="signup_creds"
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
            <div class="signup_btns">
              <button style={{borderRadius:"50px"}} class="signup_create" onClick={handleFormSubmit}>
                Create Account
              </button>
              <button style={{borderRadius:"50px",position:"relative",right:"25px"}} class="signup_login"><Link to={'/Login'} style={{textDecoration:'none',color:'black'}}>Login Now</Link></button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default SpSignup;
