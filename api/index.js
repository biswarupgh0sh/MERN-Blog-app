import express from "express";
import "dotenv/config";
import mongoose from "mongoose"

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MONGODB is connected");
})
.catch((err)=>{
    console.log("MONGODB is not connected");
})


app.get("/", (req, res)=> {
    res.send("GET request")
})

app.listen(port, ()=>{
    console.log(`Serving at ${port}`);
})