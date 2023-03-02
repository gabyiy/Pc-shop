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
  // const ramTypes = Object.values(types);
console.log(types)
  return <div>
   {/* <p>{category}</p> */}
   {/* {types.map((type)=>(
<p>{type.name}</p>
   ))} */}
  <p>{types.name}</p>

  </div>;
};

export default ProductScreen;
