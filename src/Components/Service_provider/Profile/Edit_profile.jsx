import React from 'react'
import NewsNav from '../../Dashboard/NewsFeed/NewsNav';
import './edit_profile.css'
function Edit_profile() {
   //------------------------------logout functionality
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/');
  } 
  return (
    <>
    <NewsNav handleLogout={handleLogout}/>
    <body className='profile_body'>
    <div class="profile_container">
      <div class="profile_con1">
        <div class="pro_dp">
          <img src="images/user.jpg" alt="" />
        </div>
        <div class="pro_info">
          <div class="pro_name">
            <span
              >Maaz Javed <i style={{fontSize:'13px'}} id="edit_i" class="bi bi-pencil-fill"></i
            ></span>
            <span style={{fontSize: '16px', fontWeight: '400', opacity: '0.8'}}
              >Lahore, Pakistan</span
            >
          </div>
        </div>
      </div>
      <div class="profile_con2">
        <div class="profile_con2_incon1">
          <div class="total_ern">
            <div class="total_ern2">
              <div class="boxes">
                <span class="bx">$300+</span>
                <span class="bx1">Total Earnings</span>
              </div>
              <div class="boxes">
                <span class="bx">7</span> <span class="bx1">Total Jobs</span>
              </div>

              <div class="boxes">
                <span class="bx">13</span> <span class="bx1">Total Hours</span>
              </div>
            </div>
          </div>
          <h4 id="exp_h">
            Experience <i style={{fontSize:'13px'}} id="edit_i" class="bi bi-pencil-fill"></i>
          </h4>
    
          <div class="exp_con">
            <span style={{width: '88%', fontSize: '19px', fontWeight: '600'}}
              >Heading</span
            >
            <p style={{width: '88%', fontSize: '16px'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque
              iusto voluptate eos officiis alias et, delectus des
            </p>
          </div>

          <div class="exp_con">
            <span style={{width: '88%', fontSize: '19px', fontWeight: '600'}}
              >Heading</span
            >
            <p style={{width: '88%', fontSize: '16px'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque
              iusto voluptate eos officiis alias et, delectus des
            </p>
          </div>
    
          <div class="exp_con">
            <span style={{width: '88%', fontSize: '19px', fontWeight: '600'}}
              >Heading</span
            >
            <p style={{width: '88%', fontSize: '16px'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque
              iusto voluptate eos officiis alias et, delectus des
            </p>
          </div>
        </div>
        <div class="profile_con2_incon2">
          <div class="seller_job_title">
            <div class="seller_title_head">
              <h3>
                Expert in MERN(Mongo db, express, React, Node) And Laravel
                Framework
                <i
                
                  style={{position: 'relative', top: '7px',fontSize:'13px'}}
                  id="edit_i"
                  class="bi bi-pencil-fill"
                ></i>
              </h3>
              <span>$25.00/hr</span>
            </div>
            <p style={{width: '90%' }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reprehenderit dignissimos atque provident dolores autem culpa at
              inventore tenetur quae, praesentium fugiat deleniti similique eum
              officia error. At beatae doloribus Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Qui dolor natus expedita asperiores
              officia dignissimos sint repellat, sed ab in quibusdam fugit quia.
              Doloremque numquam libero eius. Architecto, deleniti corrupti.
            </p>
          </div>
          <div class="sel_work_history">
            <div class="sel_wh_con1">
              <span id="whh">Work History</span>
              <div class="wh_navs">
                <span style={{borderBottom: '2px solid black'}}
                  >Work Completed (10)</span
                >
                <span>Work In Progress (7)</span>
              </div>
            </div>
            <div class="sel_wh_con2">
              <div class="sel_work">
                <span
                  style={{
                    width: '90%',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#49a800'
                  }}
                  >Gamedesign in HTML, stylesheet and graphic elements</span
                >
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
                          fontSize: '15px',
                          marginLeft: '3px',
                          marginRight: '2px'
                        }}
                        ><b>5.00</b></span
                      >
                      <span style={{opacity: 0.7}}
                        >Feb 2, 2022 - Feb 28, 2022</span
                      >
                    </div>
                  </div>
                </div>
                <p style={{width: '90%'}}>
                  <i style={{fontSize:'13px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laborum non tempore aut dicta minima, reiciendis nostrum sed
                    corrupti ipsum voluptatibus obcaecati veniam dolorum rem at
                    atque iure qui, eius doloremque!Lorem Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Iusto explicabo dolores
                    ad porro dignissimos. Laboriosam sequi quas fugit quibusdam,
                    quo adipisci cumque</i
                  >
                </p>
                <div class="sel_hours">
                  <span><b>$82.50</b></span>
                  <span><b>%15.0</b>/hr</span>
                  <span><b>6</b> hours</span>
                </div>
              </div>

              <div class="sel_work">
                <span
                  style={{
                    width: '90%',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#49a800'
                  }}
                  >Gamedesign in HTML, stylesheet and graphic elements</span
                >
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
                          fontSize: '15px',
                          marginLeft: '3px',
                          marginRight: '2px'
                        }}
                        ><b>5.00</b></span
                      >
                      <span style={{opacity: 0.7}}
                        >Feb 2, 2022 - Feb 28, 2022</span
                      >
                    </div>
                  </div>
                </div>
                <p style={{width: '90%'}}>
                  <i style={{fontSize:'13px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laborum non tempore aut dicta minima, reiciendis nostrum sed
                    corrupti ipsum voluptatibus obcaecati veniam dolorum rem at
                    atque iure qui, eius doloremque!Lorem Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Iusto explicabo dolores
                    ad porro dignissimos. Laboriosam sequi quas fugit quibusdam,
                    quo adipisci cumque</i
                  >
                </p>
                <div class="sel_hours">
                  <span><b>$82.50</b></span>
                  <span><b>%15.0</b>/hr</span>
                  <span><b>6</b> hours</span>
                </div>
              </div>





              <div class="sel_work">
                <span
                  style={{
                    width: '90%',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#49a800'
                  }}
                  >Gamedesign in HTML, stylesheet and graphic elements</span
                >
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
                          fontSize: '15px',
                          marginLeft: '3px',
                          marginRight: '2px'
                        }}
                        ><b>5.00</b></span
                      >
                      <span style={{opacity: 0.7}}
                        >Feb 2, 2022 - Feb 28, 2022</span
                      >
                    </div>
                  </div>
                </div>
                <p style={{width: '90%'}}>
                  <i style={{fontSize:'13px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laborum non tempore aut dicta minima, reiciendis nostrum sed
                    corrupti ipsum voluptatibus obcaecati veniam dolorum rem at
                    atque iure qui, eius doloremque!Lorem Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Iusto explicabo dolores
                    ad porro dignissimos. Laboriosam sequi quas fugit quibusdam,
                    quo adipisci cumque</i
                  >
                </p>
                <div class="sel_hours">
                  <span><b>$82.50</b></span>
                  <span><b>%15.0</b>/hr</span>
                  <span><b>6</b> hours</span>
                </div>
              </div>

              <div class="sel_work">
                <span
                  style={{
                    width: '90%',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#49a800'
                  }}
                  >Gamedesign in HTML, stylesheet and graphic elements</span
                >
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
                          fontSize: '15px',
                          marginLeft: '3px',
                          marginRight: '2px'
                        }}
                        ><b>5.00</b></span
                      >
                      <span style={{opacity: 0.7}}
                        >Feb 2, 2022 - Feb 28, 2022</span
                      >
                    </div>
                  </div>
                </div>
                <p style={{width: '90%'}}>
                  <i style={{fontSize:'13px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laborum non tempore aut dicta minima, reiciendis nostrum sed
                    corrupti ipsum voluptatibus obcaecati veniam dolorum rem at
                    atque iure qui, eius doloremque!Lorem Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Iusto explicabo dolores
                    ad porro dignissimos. Laboriosam sequi quas fugit quibusdam,
                    quo adipisci cumque</i
                  >
                </p>
                <div class="sel_hours">
                  <span><b>$82.50</b></span>
                  <span><b>%15.0</b>/hr</span>
                  <span><b>6</b> hours</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sel_skills">
            <span
              style={{
                fontSize: '20px',
                fontWeight: '600',
                width: '90%',
                textAlign: 'start'
              }}
              >Skills <i style={{fontSize:'13px'}} id="edit_i" class="bi bi-pencil-fill"></i>
            </span>
            <div class="skill_con">
              <span>React</span>
              <span>HTML</span>
              <span>Node</span>
              <span>React</span>
              <span>HTML</span>
              <span>Node</span>
              <span>React</span>
              <span>HTML</span>
              <span>Node</span>
              <span>React</span>
              <span>HTML</span>
              <span>Node</span>
              <span>React</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
    </>
    
  )
}

export default Edit_profile