import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

const reducer =(state,action)=>{
    switch(action.type){
        case "FETCH_RRQUEST":
            return {...state, loading:true}
            case "FETCH_SECCESS":
                return {...state, loading:false, product:action.payload}
                case "FETCH_FAIL":
                    return {...state, loading:false, error: action.payload}
                    default:
                    return state
    }
}

const ProductScreen = () => {
   
    const [{product,error,loading},dispatch]= useReducer(reducer,{
        loading:true,
        error:"",
        product:[]
    })

    const params = useParams()   
  const { category } = params;
    

  console.log(params)
    useEffect(()=>{
      const fetchData = async ()=>{
        dispatch({type:"FETCH_REQUEST"})
            try{      const result = await axios.get(`/api/products/category/${category}`)
        dispatch({type:"FETCH_SUCCESS",payload:result.data})
        }catch(err){
            dispatch({type:"FETCH_FAIL",payload:error.message})
        }
  
      }
  
      fetchData()
  
    },[])
    console.log(product)
  return (
    <div>
      <p>{product.slug}</p>
    </div>
  )
}

export default ProductScreen
