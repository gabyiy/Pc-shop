import React, { useContext, useEffect, useReducer } from "react";
import { useMediaQuery } from "react-responsive"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import { useRef } from "react";
import { Link, useFetcher } from "react-router-dom";
import Slider from "react-slick";
import "./Carusel.css"
import Rating from "../rating/Rating";
import LoadingBox from "../loadingBox/LoadingBox";
import MessageBox from "../messageBox/MessageBox";
import { Store } from "../../Store";
import axios from "axios";
import PrevBtn from "../prevNextBtn/PrevBtn";
import NextBtn from "../prevNextBtn/NextBtn";



const Carusel = (props) => {


  const [product,setProduct]=useState([])
  const sliderRef = useRef(null);
 const {state,dispatch:ctxDispath}=useContext(Store)
const {cart}=state



const [currentProduct,setCurrentProduct]=useState()

useEffect(()=>{
  setCurrentProduct()
},[])
 const addToCartHandler=async()=>{
  const existItem=cart.cartItems.find((x)=>x._id===props.product._id)
  const quantity = existItem? existItem.quantity+1 :1
  const {data}= await axios.get(`/api/product/$currentProduct}`)
  if(data.countInStock<quantity){
    window.alert("Sorry product out of stock")
  }
 ctxDispath({type:"CART_ADD_ITEM", payload:{...props.product,quantity}})
 }

 useEffect(()=>{
setProduct(Object.values( props.product))
 },[props.product])
  return (
    <div >
      {props.loading?<div><LoadingBox/></div>: props.error?<div><MessageBox>{props.error}</MessageBox></div>:


     
       <Slider        prevArrow={<PrevBtn/>} 	infinite={ props.length > 4}
          nextArrow={<NextBtn/> }    ref={sliderRef} slidesToShow={props.showScroll} slidesToScroll={props.showScroll} rows={props.showRows} speed={500} dots={true} class="slider"> 
 
  <div>
    {product.map((product)=>(
              <div className="">
              <Link to={`/product/prod/${product.slug}`}>

                <div className="img-caruel-container">
                  <img className="img-carusel" src={product.image} alt="img" />
                </div>
                <div className="carsuelRecipeName">
                  <p className="pName">{product.name}</p>
                  <div>
                    <p>{product.price} e</p>

                  </div>
                  </div>
                  </Link>

                  <div>
                  <div>
            <Rating rating={product.rating} numReviews={product.numReviews}/>
          </div>
          {props.product.countInStock >0 &&
          <div>
            <button onClick={addToCartHandler}variant="primary" className='btn-primary'>Add to cart</button>
            </div>
        }
                  </div>
                </div>
                ))}
            </div>
              
        
</Slider>


}



    </div>
  )
  
}

export default Carusel
