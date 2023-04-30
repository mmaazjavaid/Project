import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <body>
       <ul className="home_navbar">
        <span className="home_title">E-Market</span>
        <div className="home_navlinks">
          {/* <li class="home_navs">How it works</li>
          <li class="home_navs">Costing</li>
          <li class="home_navs">Our Talent</li> */}
          <Link to={'Signup_Service_Provider'} style={{textDecoration:'none'}}><li className="home_navs" style={{marginRight:'50px'}}>Join as a Service provider</li></Link>
          <Link to={'/Login'} style={{textDecoration:'none'}}><li class="home_navs">Login</li></Link>
        </div>
        <Link to={'/Signup'}><button className="home_btn1">Get Started</button></Link>
      </ul>
      
    <div className="home_container">
     

      <div className="home_con">
        <div className="home_text">
          <h1>
            World's best marketing & renting place ready to serve you anytime
            anywhere.
          </h1>
          <h2>
            Join us as a User or Service provider to show case you Amazing Products ,services and Talent
          </h2>
          <Link to={'/Signup'}><button className="home_btn2">Get Started</button></Link>
        </div>
        <div className="home_image">
          <img src="images/pic.jpg" alt="" />
        </div>       
      </div>
    </div>
  </body>
  )
}

export default Home