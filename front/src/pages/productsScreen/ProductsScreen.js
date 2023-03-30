import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductScreen = () => {
  const params = useParams();

  const { category } = params;
const [types,setTypes]= useState([])
  
  useEffect(()=>{
    const fetchData = async ()=>{
    const result = await axios.get(`/api/products/category/${category}`)
    setTypes(result.data)

    }

    fetchData()

  },[])
 // console.log(category)
  // const ramTypes = Object.values(types);
  return <div>
  <div>  <p>{types.name}</p>
</div>
<div>
  <Rating rating={types.rating} numReviews={types.numReviews}/>
</div>
  </div>;
};

export default ProductScreen;
