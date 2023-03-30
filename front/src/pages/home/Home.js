import axios from "axios";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import React, { useEffect, useReducer } from "react";
import Header from "../../components/header/Header";
import "./home.css";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Carusel from "../../components/carusel/Carusel";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/messageBox/MessageBox";
import { getError } from "../../components/utils";


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
  const [ showScroll,SetShowScroll]=useState()
  const [showRows,setShowRows]=useState()
  const slideRef= useRef(null)

  const view1 = useMediaQuery({query:"(max-width:550px)"})
  const view2 =useMediaQuery({query:"(min-width:850px)"})
  const view3 =useMediaQuery({query:"(min-width:1170px)"})

  useEffect(()=>{
if(view3){
  SetShowScroll(4)
  setShowRows(1)
}
else if(view2){
  SetShowScroll(3)
}
else if(view1){
  SetShowScroll(1)
  setShowRows(1)
}
  },[view1,view2,view3])


  
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
dispatch({type:"FETCH_FAIL",payload:getError( err)})
    }
  } 
  fetchData()
},[])
  return (
    <div>
      <Helmet><title>Componentes PC</title></Helmet>
      <Header />
      {/* <div className="main"> */}
{loading?<div><LoadingBox/></div>:error?<div><MessageBox variant="danger">{error}</MessageBox></div>:<div className="carusel-page-div">

{/* ////{products.map((product)=>( */}
<Carusel  products={products} showRows={showRows} showScroll={showScroll} slideRef={slideRef} error={error} loading={loading}/>
{/* ////))} */}
  
  </div>}
      {/* </div> */}

    </div>
  );
};

export default Home;
