const express=require("express")
const app=new express();
const cors=require('cors')
const cookieParser=require("cookie-parser")  

// =======================================     Dotenv import     =========================================
app.use(cors())
const dotenv=require("dotenv")
dotenv.config({path: "./config.env"})

const port=process.env.PORT || 5000;

require("./DB/Connection")

// ============================================      IMPORT ROUTERS      ===============================

const UserRouter=require("./Router/UserRouter")
const SPRouter=require("./Router/SPRouter")
const AdRouter=require("./Router/AdRouter")



app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(UserRouter)
app.use(SPRouter)
app.use(AdRouter)



app.listen(port,()=>{
    console.log("Yes your Server is running on port no : "+port)
})
