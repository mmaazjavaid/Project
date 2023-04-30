//--------------------------------------Material Imports
import { Fade, Modal, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

//--------------------------------------React Imports
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//-------------------------------------Component Imports
import AdDetails from '../CreateAd/AdDetails'
import './myads.css'
import NewsNav from './NewsNav'



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

function MyAds() {
  let navigate=useNavigate() 
  const [ads,setads]=useState([])
  const baseurl="http://localhost:3001"

  

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



 //----------------------------CODE FOR DELETE ALERT--------------------------------
  const [openCard, setopenCard] = useState(false);
  const [deleteAdId,setdeleteAdId]=useState(0);
  const handleCardOpen = (id) =>{
    setdeleteAdId(id)
    setopenCard(true)
  }
  const handleCloseCard = () => setopenCard(false);


      //-------------------------------Delete Ad------------------------------------------

  const deleteAd=async(ad_id)=>{
    // var token = localStorage.getItem("token");
    // var config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // };
    const res= await axios.delete(`${baseurl}/api/Delete-Ad/`+ad_id)
    const data= await res.data
    handleCloseCard()
    setalertmsg("Ad Deleted successfully")
    setalertseverity("error")
    setOpenAlert(true)
    getAds()
  }
  
  
  


  //------------------------------logout functionality
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/');
  }

  //-----------------------------getAds
  const getAds= async ()=>{
    const res=await axios.get(`${baseurl}`+'/api/show-user-ads/'+localStorage.getItem('user_id'))
    setads(res.data);
  }

  //-----------------------------get single add

  const getSingleadd=async(ad_id)=>{
    const res=await axios.get(`${baseurl}`+'/api/show-single-Ad/'+ad_id)

  }

  //----------------------------filters
  const [filters,setfilters]=useState({
    low:0,
    high:1000000,
    category:0
  })
  const filter=async()=>{
    const res=await axios.get(`${baseurl}`+'/api/show-user-ads/'+localStorage.getItem('user_id'))
    applyFilter(res.data);
   
  }
  const applyFilter=(data)=>{
    if(+filters.low >+filters.high){
      alert("low must be smaller than high.!")
      return
    }
    const newarray=data.filter((e)=>{
      return +e.budget>=+filters.low && +e.budget<=+filters.high &&  (+e.category==+filters.category || filters.category==0)
    })
    setads(()=>newarray)
  }
  useEffect(()=>{
    filter()
  },[filters])

  //---------------------------Loader
  const [showloader,setshowloader]=useState(true);

  //-------------------------fade

  const [isVisible, setIsVisible] = useState(false);

  // Toggle the visibility of the div when the button is clicked
  const handleButtonClick = async(ad_id) => {
    if(isVisible==false) getSingleadd(ad_id)
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

    <Modal
        open={openCard}
        onClose={handleCloseCard}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{border:"none !important",outline:"none"}}
      >
      <div className='resellerAccountModalContainer' style={{border:"none !important",outline:"none"}}>
       <div className='resellerAccountModal'>
        <div className='resellerAccountModalHeader'>
		<DeleteIcon style={{fontSize:'40px',padding:"0px !important",marginTop:'10px',marginBottom:"0px"}}/>
        <p style={{padding:"0px !important",marginTop:"5px"}}>Delete Account Forever</p>
        </div>
        <div className='resellerAccountModalSearch'>
        <p>Do you want to delete this Ad?</p>
        </div>
		<div className='resellerAccountDeleteButtons'>
			<a onClick={()=>handleCloseCard()} className='resellermodalcancel' style={{color:'blue',marginTop:'5px',cursor:'pointer',textDecoration:'none'}}>Cancel</a>
			<a onClick={()=>deleteAd(deleteAdId)} className='resellermodaldelete' style={{textDecoration:'none '}} > <DeleteIcon style={{fontSize:'20px',margin:'0 5px 0 0'}}/> <p> Delete</p></a>
		</div>
        
       </div> 
      </div>  
</Modal>
     
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
                <h6>{e.title}</h6>
                <div class="like" style={{display:'flex',justifyContent:'flex-end'}}>
                <DeleteIcon onClick={()=>handleCardOpen(e._id)} style={{fontSize:'40px',padding:"0px !important",marginTop:'10px',marginBottom:"0px",marginRight:'0px',color:'#f56a41',cursor:'pointer'}}/>
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

                    {e.images.length==0? 
                    <>
                    <div class={`carousel-item}`}>
                    <img src='images/placeholder.png' class="d-block w-auto m-auto" alt="..." />
                    </div>
                    </>                    
                    :
                    ''
                    }

                    {e.images.map((img,index)=>{
                      return(
                    <div class={`carousel-item ${index==0 ? 'active':''}`}>
                      <img src={img} class="d-block w-auto m-auto" alt="..." />
                    </div>
                      )
                    })}
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
                <div class="stars">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star"></i>
                </div>
                <span id="ratingVal">4/5</span>
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

export default MyAds


