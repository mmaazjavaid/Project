import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data:[],
    loading:false,
    alert:{
        isOpen:false,
        message:null,
        severity:"success"
    }
}

const adSlice=createSlice({
    name:"Ad",
    initialState,
    reducers:{
       getAdsRequest:()=>{

       },
       getAdsSuccess:()=>{

       },
       getAdsFail:()=>{

       },
       getAdRequest:()=>{

       },
       getAdSuccess:()=>{

       },
       getAdFail:()=>{

       },
       createAdRequest:()=>{

       },
       createAdSuccess:()=>{

       },
       createAdFail:()=>{

       },
       updateAdRequest:()=>{

       },
       updateAdSuccess:()=>{

       },
       updateAdFail:()=>{

       },
       deleteAdRequest:()=>{

       },
       deleteAdSuccess:()=>{

       },
       deleteAdFail:()=>{

       },
    }
})

export const{
  getAdsRequest,
  getAdsSuccess,
  getAdsFail,
  getAdRequest,
  getAdSuccess,
  getAdFail,
  createAdRequest,
  createAdSuccess,
  createAdFail,
  updateAdRequest,
  updateAdSuccess,
  updateAdFail,
  deleteAdRequest,
  deleteAdSuccess,
  deleteAdFail
}=adSlice.actions

export default adSlice.reducer