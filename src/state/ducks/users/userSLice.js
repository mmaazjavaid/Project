import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data:[],
    loading:false,
    isAuth:localStorage.getItem("token")? true:false,
    alert:{
        isOpen:false,
        message:null,
        severity:"success"
    }
}

const userSlice=createSlice({
    name:"User",
    initialState,
    reducers:{
        loginRequest:()=>{

        },
        loginSuccess:()=>{

        },
        loginFail:()=>{

        },
        registerRequest:()=>{

        },
        registerSuccess:()=>{

        },
        registerFail:()=>{

        }
    }
})

export const{
    loginRequest,
    loginSuccess,
    loginFail,
    registerRequest,
    registerSuccess,
    registerFail
}=userSlice.actions

export default userSlice.reducer