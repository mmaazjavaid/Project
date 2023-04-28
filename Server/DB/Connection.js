const mongoose=require("mongoose");
const DB=process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(DB)
.then(()=>{
    console.log("Database is connected");
})
.catch((err)=>{
    console.log("Database not connected");
})
