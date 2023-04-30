import React from 'react'
import './footer.css'
function Footer() {
  return (
    <footer style={{marginTop:'70px'}}>
      <div class="footer_links">
        <div class="footer_navs">
          <a href="">Community</a><a href="">Feedback</a
          ><a href="">Community</a>
        </div>
        <div class="footer_navs">
          <a href="">Trust, Safety & Security</a><a href="">Help & Support</a
          ><a href="">E-Market Foundation</a>
        </div>
        <div class="footer_navs">
          <a href="">Terms of Service</a><a href="">Privacy Policy</a
          ><a href="">Cookies Settings</a>
        </div>
        <div class="footer_navs">
          <a href="">Accessibility</a><a href="">Desktop App</a
          ><a href="">Cookie Policy</a>
        </div>
      </div>
      <div class="footer_icons">
        <div class="footer_icons_con">
          <div class="footer_follow">
            <span>Follow Us</span>
            <div class="i_con">
              <i class="bi bi-facebook"></i>
              <i class="bi bi-linkedin"></i>
              <i class="bi bi-youtube"></i>
              <i class="bi bi-twitter"></i>
              <i class="bi bi-instagram"></i>
            </div>
          </div>
          <div class="footer_mobile">
            <span>Mobile App</span>
            <div class="i_con2">
              <i class="bi bi-apple"></i>
              <i class="bi bi-android2"></i>
            </div>
          </div>
        </div>
        <hr />
        <p>© 2015 - 2023 E-Market® Global Inc.</p>
      </div>
    </footer>
  )
}

export default Footer