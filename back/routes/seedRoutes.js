import express from "express"
import data from "../data.js"
import Product from "../models/productModel.js"

const seedRouter = express.Router()

seedRouter.get("/",async(req,res)=>{

   await Product.deleteMany({})
 
    const createProduct = await Product.insertMany(data.products)
    res.send(createProduct)
})
   
export default seedRouter