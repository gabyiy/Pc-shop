import mongoose  from "mongoose";

const productSchema = new mongoose.Schema(

    {
        category:{type:String,require:true},
        name: {type:String ,require:true, unique:true},
        slug:{type:String,require:true},
        image:{type:String,require:true},
        price: {type:Number,require:true},
        countInStock:{type :Number,require:true},
        brand:{type:String,require:true},
        rating:{type:Number,require:true},
        numReviews:{type :Number,require:true},
        description:{type:String,require:true}

    },
    {
        timestamps:true
    }
)

const Product = mongoose.model("Product",productSchema)

export default Product