import express from "express";
import data from "./data.js";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv"
import seedRouter from "./routes/seedRoutes.js";

dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("connected to db")
}).catch((err)=>{
  console.log(err.message)
})


const app = express();

app.use("/api/seed",seedRouter)
app.get("/api/products", (req, res) => {
  if(data){
  res.send(data.products);
  }else {
    res.status(404).send({message:"Products not found"})
  }
});

app.get("/api/product/slug/:slug",(req,res)=>{
  const product =data.products.find((x)=>x.slug===req.params.slug)
  if(product){
  res.send(product)
  }else{
    res.status(404).send({message:"PRoduct not found"})
  }
})
app.get("/api/product/:id",(req,res)=>{
  const product =data.products.find((x)=>x._id===req.params.id)
  if(product){
  res.send(product)
  }else{
    res.status(404).send({message:"Product not found"})
  }
})
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}
  `);
});
