import axios from 'axios'
import React, { useState} from 'react'
import './createad.css'
import { Link, useNavigate } from 'react-router-dom'

//--------------------------Icons Import

import CancelIcon from '@mui/icons-material/Cancel';
//--------------------------ALERT IMPORTS

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import NewsNav from '../NewsFeed/NewsNav';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function CreateAd() {
  let navigate=useNavigate()   
  const baseurl="http://localhost:3000"
  //------------------------------logout functionality
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/');
  }  
  const [inputs,setinputs]=useState({
    user_id:localStorage.getItem('user_id'),
    category:1,
    title:'',
    description:'',
    budget:'',
    images:[

    ],
    location:'',
    name_in_ad:'',
    product_detail:'',
    product_catagory:'',
    likes:0,
    points_required:0,
    experience_required:'Entry Level',
    skills_required:[],
    tags:[]
  })
  //-------------------------handle image upload
  const submitForm=async()=>{
  console.log(inputs)
  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('user_id'));
  formData.append('category',inputs.category)
  formData.append('title', inputs.title);
  formData.append('budget', inputs.budget);
  formData.append('description', inputs.description);
  for (let i = 0; i < inputs.images.length; i++) {
    formData.append('images', inputs.images[i][0]);
  }
  try {
    const response = await axios.post(`${baseurl}/api/create-Ad`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setalertmsg("Ad Posted Successfully")
    handleClick()
  } catch (error) {
    console.log(error);
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
    navigate('/News')
  };

 //---------------------images show-------------------------------------
 const [imagesShow,setImagesShow]=useState([
  {
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },{
    img:''
  },
 ])
  const [inputimages,setinputimages]=useState([
  ]);

  const imageinputsarray=[];
  
  const  handleImageChange=(index, event)=>{
    const files = Array.from(event.target.files);
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = () => {
        setImagesShow(prevImagesShow => {
          const newImagesShow = [...prevImagesShow];
          newImagesShow[index] = { img: reader.result }; // update the element at the correct index
          return newImagesShow;
        });
      };
  
      reader.readAsDataURL(file);
    }

    const newArray=[...inputs.images]
    newArray[index]=files;
    inputs.images=newArray
  }

  //-----------------------Remove image-----------------------

  const removeImage=(index)=>{
    console.log(index)
    const newArray=[...imagesShow]
    newArray[index]={img:''}
    setImagesShow(newArray)
    inputs.images.splice(index,1);
    //inputs.images=inputs.images.filter((item,i)=> item !== '' && item !== null && item !== undefined )
    console.log(inputs.images)
  }
  
  // Render the input elements using the imageinputsarray variable
  for (let index = 0; index < 20; index++) {
    imageinputsarray.push(
      <div className="image-upload" key={index}>
        <label htmlFor={`image-input-${index}`}>
          <>
            {imagesShow[index].img === '' ? (
              <i className="bi bi-camera"></i>
            ) : (
              <>
              <CancelIcon onClick={()=>removeImage(index)} style={{position:'absolute'}}/>
              <img src={imagesShow[index].img} alt="" srcSet="" />
              </>
              
            )}
          </>
        </label>
        <input
          id={`image-input-${index}`}
          type="file"
          name="images"
          multiple
          onChange={event => handleImageChange(index, event)}
        />
      </div>
    );
  }
  

  

  return (
  <>
  <Snackbar open={openalert} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertseverity} sx={{ width: '100%' }}>
          {alertmsg}
        </Alert>
      </Snackbar>
      <NewsNav handleLogout={handleLogout}/>
    <div>
         <div class="post_ad_con">
      <h2>POST YOUR AD</h2>
      <div class="ad_form_con">
        <div class="category">
          <h3>SELECTED CATEGORY</h3>
          <select name="category"
          value={inputs.category}
          onChange={(e)=>{
            setinputs((prev)=>{
                return{
                    ...prev,
                    category:e.target.value
                }
            })
          }}
          id="" aria-placeholder="Select Category">
            <option value="1">Modify Products</option>
            <option value="2">Customizeable Products</option>
            <option value="3">Rent Products</option>
          </select>
        </div>
        <div class="details">
          <h3>INCLUDE SOME DETAILS</h3>
          <div class="ad_title">
            <h4>Ad Title</h4>
            <input type="text"
            value={inputs.title}
            onChange={(e)=>{
              setinputs((prev)=>{
                  return{
                      ...prev,
                      title:e.target.value
                  }
              })
            }}
            name="title" id="" />
          </div>
          <div class="ad_des">
            <h4>Description</h4>
            <textarea name="description"
            value={inputs.description}
            onChange={(e)=>{
              setinputs((prev)=>{
                  return{
                      ...prev,
                      description:e.target.value
                  }
              })
            }}
            id="" cols="30" rows="10"></textarea>
          </div>
          <div class="brand">
            <h4>Brand</h4>
            <input type="text" name="" id="" />
          </div>
        </div>
        <div class="price_con">
          <h3>SET A PRICE</h3>
          <div class="price">
            <h4>Budget</h4>
            <input type="number" 
            value={inputs.budget}
            onChange={(e)=>{
              setinputs((prev)=>{
                  return{
                      ...prev,
                      budget:e.target.value
                  }
              })
            }}
            />
          </div>
        </div>
        <div class="photos">
          <h3>UPLOAD UP TO 20 PHOTOS</h3>
          <div class="photos_con">
            {imageinputsarray.map((e)=>{
              return e
            })}
          </div>
        </div>
        <div class="price_con">
          <h3>Your Ad's Location</h3>
          <div class="price">
            <h4>Location</h4>
            <input type="text" />
          </div>
        </div>
        <div class="your_details">
          <h3>REVIEW YOUR DETAILS</h3>
          <div class="user_details">
            <img src="images/user.jpg" alt="" />
            <div class="name">
              <h4>Name</h4>
              <input type="text" name="" id="" />
            </div>
          </div>
          <div class="phone">
            <span>Your Phone Number</span>
            <span>+923339448548</span>
          </div>
          <div class="show">
            <span>Show my phone number in ads</span>
            <input type="checkbox" name="" id="" />
          </div>
        </div>
        <div class="btn">
          <button onClick={()=>submitForm()}>Post Now</button>
        </div>
      </div>
    </div>
    </div>
  </>
  )
}

export default CreateAd