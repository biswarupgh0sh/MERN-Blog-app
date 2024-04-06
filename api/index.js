import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res)=> {
    res.send("GET request")
})

app.listen(port, ()=>{
    console.log(`Serving at ${port}`);
})