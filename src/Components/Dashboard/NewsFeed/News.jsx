
//-------------------------MUI IMPORTS
import { Fade, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';

//---------------------React imports
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdDetails from '../CreateAd/AdDetails'
import './news.css'
import NewsNav from './NewsNav'
function News() {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

  let navigate=useNavigate() 
  const [ads,setads]=useState([])
  const baseurl="http://localhost:3001"


  //------------------------------logout functionality
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/');
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


  //------------------------------like/dislike functonality

  const like_dislike_ad=async(type,ad_id)=>{
    const res=await axios.post(`${baseurl}`+'/api/like-unlike-Ad/',{ user_id:localStorage.getItem('user_id'), ad_id:ad_id })
    .then(response=>{
      setalertmsg(`You ${type} the add`)
      if(type=="Liked") setalertseverity("success")
      else setalertseverity("warning")
      setOpenAlert(true)
    })
    .catch(error=>{
      setalertmsg(`Something wrong happend`)
      setalertseverity("error")
      setOpenAlert(true)
    })
  }


  //-----------------------------getAds
  const getAds= async ()=>{
    const res=await axios.get(`${baseurl}`+'/api/show-all-Ads')
    setads(res.data);
    console.log(res.data)
  }





  //----------------------------filters
  const [filters,setfilters]=useState({
    low:0,
    high:1000000,
    category:0,
  })
  const filter=async()=>{
    const res=await axios.get(`${baseurl}`+'/api/show-all-Ads')
    applyFilter(res.data)
  }
  const applyFilter=(data)=>{
    if(+filters.low >+filters.high){
      alert("low must be smaller than high.!")
      return
    }
    const newarray=data.filter((e)=>{
      return +e.budget>=+filters.low && +e.budget<=+filters.high && (+e.category==+filters.category || filters.category==0)
    })
    setads(()=>newarray)
  }
  useEffect(()=>{
    filter()
  },[filters])



  //---------------------------Loader
  const [showloader,setshowloader]=useState(true);



    //-----------------------------get single add/ad details

    const[ads_details,setads_details]=useState({
      budget: 999,
      category: 2,
      createdAt: "",
      images: [],
      likes: 1,
      skills_required: [],
      tags: [],
      title: "Ad without image",
      updatedAt: "",
      user_id: {
         total_jobs: Array(0),
         _id: '',
         email: '',
      username: '', 
      phone: ''
    },
    __v: 0,
   _id: ""
    })


  //-------------------------fade

  const [isVisible, setIsVisible] = useState(false);

  // Toggle the visibility of the div when the button is clicked
  const handleButtonClick = (ad) => {
    console.log(ad)
    if(isVisible==false) setads_details(ad)
    setIsVisible(!isVisible);
  };


  //---------------------------First use effect
  useEffect(()=>{
    getAds()
    const loaderTimeout=setTimeout(() => {
      setshowloader(false);
    }, 4000);
    return () => {
      clearTimeout(loaderTimeout)
    };
  },[])
  return (
    <body>    
      <NewsNav handleLogout={handleLogout}/>
      <Snackbar open={openalert} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertseverity} sx={{ width: '100%' }}>
          {alertmsg}
        </Alert>
    </Snackbar>
    <div class="home_container">
      <div class="feed_container">
        <div class="feed">
          <div style={{borderRadius:'20px',border:'1px solid lightgrey'}} class="news_feed_con">
          {ads.length==0 ? <h2 
            style={{
                display:'flex',
                width:'100%',
                height:'100%',
                justifyContent:'center',
                alignItems:'center',
                fontWeight:'bold',
                fontSize:'18px'}}>No Data Found</h2>: ''}
            {ads.map((e,i)=>{
              return(
                <div  key={i} 
                style={i==ads.length-1?{marginBottom:'20px'}
                :
                {borderBottom:'1px solid lightgrey'}} 
                class="ad">
              <div class="ad_title">
                <h6 >{e.title} &nbsp; <span onClick={()=>handleButtonClick(e)} style={{textDecoration:'underline',fontSize:'14px',fontWeight:'normal',color:'#2ba8bb',}}>View details</span>  </h6>
                <div class="like">
                  <i onClick={()=>like_dislike_ad('Liked',e._id)} class="bi bi-hand-thumbs-up-fill"></i>
                  <i onClick={()=>like_dislike_ad('DisLiked',e._id)} class="bi bi-hand-thumbs-down-fill"></i>
                </div>
              </div>
              <div class="seller_info">
                <div class="info">
                  <img src="images/user.jpg" alt="" />
                  <span class="seller_name">Umer</span>
                </div>
                <span class="budget">{e.budget} Rs</span>
              </div>
              <div class="images">
                <div id="carouselExample" class="carousel slide">
                  <div class="carousel-inner">
                    {/* {console.log(e.images)} */}

                    {e.images.length==0? 
                    <div class={`carousel-item}`}>
                    <img src='images/placeholder.png' class="d-block w-auto m-auto" alt="..." />
                    </div>
                    :
                    <>
                    
                    {e.images.map((image,index)=>{
                      return(
                    <div class={`carousel-item ${index==0? 'active': ''} `}>
                      <img src={e.images[index]} class="d-block w-100" alt="..." />
                    </div>
                      )
                    })
                      
                   }
                    </>
                    }
                    
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div class="description">
                <b>
                {e.description}
                  </b>
              </div>
              <div class="rating">
                <span><b>Rating:</b></span>
                {e.user_id.rating?
                <>
                <div class="stars">   
                {[...Array(e.user_id.rating)].map((_, index) => (
                     <i className="bi bi-star-fill" key={index}></i>
                 ))}
                {[...Array(5 - e.user_id.rating)].map((_, index) => (
                    <i className="bi bi-star" key={index}></i>
                 ))}
                </div>
                <span id="ratingVal">{e.user_id.rating}/5</span>
                </>
                :
                <p>Not Rated </p>
                }
                
              </div>
            </div>
              )
            })}

          </div>
        </div>
      </div>

      <div class="filter">
      <button id="filterbtn"><i class="bi bi-list"></i>Filters</button>
      <div class="filter_con">
        <h3>Filter By</h3>
        <div class="filter_by_category filters">
        <span>Category</span>
          <select
          value={filters.category}
          onChange={(e)=>{
            setfilters((prev)=>{
              return{
                ...prev,
                category:e.target.value                  
              }
            })
          }}
          type="number" placeholder="Category">
            <option value="0">Any</option>
            <option value="1">Modify Products</option>
            <option value="2">Customizeable Products</option>
            <option value="3">Rent Products</option>
          </select>
        </div>
        <div class="filter_by_budget filters">
          <span>Budget</span>
          <div class="budget_range">
            <input type="number" placeholder="Min"
            value={filters.low}
            onChange={(e)=>{
              setfilters((prev)=>{
                return{
                  ...prev,
                  low:e.target.value                  
                }
              })
            }}
            name="low"
            />
            <input type="number" placeholder="Max" 
            value={filters.high}
            onChange={(e)=>{
              setfilters((prev)=>{
                return{
                  ...prev,
                  high:e.target.value                  
                }
              })
            }}
            name='high'
            />
          </div>
        </div>
        <div class="filter_by_rating filters">
          <span>Rating</span>
          <input type="text" placeholder="Rating" />
        </div>
        <div class="filter_by_location filters">
          <span>Seller Location</span>
          <input type="text" placeholder="Seller Location" />
        </div>
        <div class="filter_by_seller_history filters">
          <span>Seller History</span>
          <div class="sales_range">
            <input type="number"
             placeholder="Min Sales"
             
             />
            <input type="number"
             placeholder="Max Sales"
             
             />
          </div>
        </div>
        <button id="results">Show Results</button>
      </div>
    </div>

    <Fade in={isVisible} timeout={600}>
    <div style={{position:'absolute',top:0,left:0}}>
      <AdDetails ad_details={ads_details} handleButtonClick={handleButtonClick}/>
      </div>
    </Fade>
      {/* <div class="filter">
        <h3>Filter</h3>
        <span id="filter_budget">Budget</span>
        <div class="filter_inputs">
          <div class="range">
            <span>Min</span>
            <input type="number"
            value={filters.low}
            onChange={(e)=>{
              setfilters((prev)=>{
                return{
                  ...prev,
                  low:e.target.value                  
                }
              })
            }}
            name="low" id="" />
          </div>
          <div class="range">
            <span>Max</span>
            <input 
            value={filters.high}
            onChange={(e)=>{
              setfilters((prev)=>{
                return{
                  ...prev,
                  high:e.target.value                  
                }
              })
            }}
            type="number" name="" id="" />
          </div>
        </div>
      </div> */}
    </div>

  </body>
  )
}

export default News