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
import AddProductButton from "../addProductButton/AddProductButton";



const Carusel = (props) => {


  const [product,setProduct]=useState([])
  const sliderRef = useRef(null);
 const {state,dispatch:ctxDispath}=useContext(Store)
const {cart}=state




  return (
    <div >
      {props.loading?<div><LoadingBox/></div>: props.error?<div><MessageBox>{props.error}</MessageBox></div>:
<div className="slider-div">
     
       <Slider        prevArrow={<PrevBtn/>} 	infinite={ product.length > 4}
          nextArrow={<NextBtn/> }    ref={sliderRef} slidesToShow={props.showScroll} slidesToScroll={props.showScroll} rows={props.showRows} speed={500} dots={true} class="slider"> 
 {props.products.map((product)=>(

  <div className="map-slider-div">
    
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
          {product.countInStock >0 &&
          <div>
            <AddProductButton productSlug={product.slug} productId={product._id} productCountInStock={product.countInStock}/>
            </div>
        }
                  </div>
            </div>

  // <div style={{margin:"30px"}}>
  //      <div>
  //           <h3>1</h3>
  //         </div>
  //         <div>
  //           <h3>2</h3>
  //         </div>
  //         <div>
  //           <h3>3</h3>
  //         </div>
  //         <div>
  //           <h3>4</h3>
  //         </div>
  //         <div>
  //           <h3>5</h3>
  //         </div>
  //         <div>
  //           <h3>6</h3>
  //         </div>
  //         <div>
  //           <h3>7</h3>
  //         </div>
  //         <div>
  //           <h3>8</h3>
  //         </div>
  //         <div>
  //           <h3>9</h3>
  //         </div>
  // </div>
))}

</Slider>

  </div>
}



    </div>
  )
  
}

export default Carusel
