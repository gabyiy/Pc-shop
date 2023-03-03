import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Header from "../../components/header/Header";
import "./home.css";


const reducer = (state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return {...state,loading:true}
    case "FETCH_SUCCESS"  :
      return{...state,loading:false,products:action.payload}
      case "FETECH_FAIL":
        return{...state,error:action.payload,loading:false}
        default:
        return state
  }
}
const Home = () => {
  
const [{loading , error,products},dispatch]= useReducer(reducer,{
  loading:true,
  error:"",products:[]
})
useEffect(()=>{

  const fetchData = async ()=>{
    dispatch({type:"FETCH_REQUEST"})
    try{
    const result = await axios.get("/api/products")
    dispatch({type:"FETCH_SUCCESS",payload:result.data})
    }catch(err){
//dispatch({type:"FETCH_FAIL",payload:error.message})
    }
  } 
  fetchData()
},[])
console.log(products)
  return (
    <div>
      <Header />
      <div className="main">
{loading?<div>Loading</div>:<div>
  {products.products.map((product)=>(
    <div>
    <p>{product.name}</p>  
    </div>
  ))}
  </div>}
      </div>
    </div>
  );
};

export default Home;
