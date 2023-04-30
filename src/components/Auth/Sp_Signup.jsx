import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'
//--------------------------ALERT IMPORTS

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Sp_Signup(){
  let navigate=useNavigate();
  const baseurl="http://localhost:3001"
  const [inputs,setinputs]=useState({
    name:null,
    username:null,
    phone:null,
    email:null,
    password:null
  });
  const changePassword=(e)=>{
  if(e.target.value){
    if((!/\d/.test(e.target.value))||(!/[a-zA-Z]/.test(e.target.value))||e.target.value.length<7){
      // seterror(true);
    }else{
      // seterror(false)
    }
  }  
  setinputs((prev)=>{
      return {
          ...prev,
          password:e.target.value
      }
  })
  }
  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    if(inputs.password!=confirm){
      alert("password and confirm password must be same")
      return;
    }
    if(inputs.password.length<8){
      return
    }else{
    setinputs((prev)=>{
        return {
            ...prev,
        }
    })
    const res= await axios.post(`${baseurl}/api/signup-SP`,inputs)
    .then(response=>{

    })
    .catch(error=>{
        return error
    })
    }
  }

    //-----------------------------ALERT CODE------------------

    const [alertmsg,setalertmsg]=useState();
    const [openalert, setOpenAlert] = useState(false);
    const [alertseverity,setalertseverity]=useState('success')
    const handleClick = () => {
      setOpenAlert(true);
    };
  
    const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };
  

//------------------confirm password

const[confirm,setconfirm]=useState();


  return (
    <body>
      <Snackbar open={openalert} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertseverity} sx={{ width: '100%' }}>
          {alertmsg}
        </Alert>
      </Snackbar>
    <div class="signup_container">
      <div class="signup_image">
        <img src="images/pic4.jpg" alt="" />
      </div>
      <div class="signup_form_con">
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
            name='name' 
            value={inputs.name} 
            onChange={(e)=>setinputs((prev)=>{
                return{
                    ...prev,
                    name:e.target.value
                }
            })} 
            label="Name" 
            />
          </div>
          <div class="signup_input_con">
            <i class="signup_bi bi-person"></i>
            <input
              class="signup_creds"
              type="text"
            name='username' 
            value={inputs.username} 
            onChange={(e)=>setinputs((prev)=>{
                return{
                    ...prev,
                    username:e.target.value
                }
            })}
              placeholder="Username"
            />
          </div>
          <div class="signup_input_con">
            <i class="signup_bi bi-phone"></i>
            <input 
            class="signup_creds" 
            type={'tel'}
            name='phone' 
            value={inputs.phone} 
            onChange={(e)=>setinputs((prev)=>{
                return{
                    ...prev,
                    phone:e.target.value
                }
            })}
            placeholder="Phone" />
          </div>
          <div class="signup_input_con">
            <i class="signup_bi bi-envelope"></i>
            <input
              class="signup_creds"
              type="email"
            name='email' 
            value={inputs.email} 
            onChange={(e)=>setinputs((prev)=>{
                return{
                    ...prev,
                    email:e.target.value
                }
            })}
              placeholder="Email Address"

            />
          </div>
          <div class="signup_input_con">
            <i class="signup_bi bi-lock"></i>
            <input
              class="signup_creds"
              type="password"
            name='password' 
            value={inputs.password} 
            onChange={(e)=>setinputs((prev)=>{
                return{
                    ...prev,
                    password:e.target.value
                }
            })}
              placeholder="Password"
            />
          </div>
          <div class="signup_input_con">
            <i class="signup_bi bi-lock"></i>
            <input
              class="signup_creds"
              type="password"
              value={confirm}
              onChange={(e)=>{
                setconfirm(e.target.value)
              }}
              name="confirm_password"
              placeholder="Confirm Password"
            />
          </div>
          <div class="signup_btns">
            <button class="signup_create" onClick={handleFormSubmit}>Create Account</button>
            {/* <button class="signup_login"><Link to={'/Login'} style={{textDecoration:'none',color:'black'}}>Login Now</Link></button> */}
          </div>
          <p id="join">Or you can join with</p>
          <div class="signup_icons">
            <i class="bi signup_bi-google"></i>
            <i class="bi signup_bi-facebook"></i>
            <i class="bi signup_bi-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  </body>
  )
}

export default Sp_Signup