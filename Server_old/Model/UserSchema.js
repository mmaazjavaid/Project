const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const validator = require('validator');

         // ===========================  User  Schema  ===========================

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']

    },
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength: [8, 'Password should be at least 8 characters long']
    },
    profile_image:{
        type:String
    },
    total_jobs:[{
        type:Object               
    }],
    rating:{
        type:Number,
    }
    
},{timestamps:true})


userSchema.pre("save", async function(next){

    if (this.isModified("password")){

        this.password=await bcrypt.hash(this.password,10)
        
        next()
    }
})

const Users=mongoose.model("Users",userSchema)


        // =========================  Export module  =============================
module.exports=Users;