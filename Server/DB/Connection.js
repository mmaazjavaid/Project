const mongoose=require("mongoose");
const DB=process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(DB)
.then(()=>{
    console.log("yes your Database is connected");
})
.catch((err)=>{
    console.log("sorry your Database is not connected" +err);
})
