import axios from "axios";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import React, { useContext, useEffect, useReducer } from "react";
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
import Rating from "../../components/rating/Rating";
import { Store } from "../../Store";
import PrevBtn from "../../components/prevNextBtn/PrevBtn";
import NextBtn from "../../components/prevNextBtn/NextBtn";
import ProductCarusel from "../../components/productsCarusel/ProductCarusel";


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

  const [product,setProduct]=useState([])
  

const {state, dispatch:ctxDispatch}=useContext(Store)

const {cart}= state

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


  const addToCartHandler=async()=>{
  //  const existItem=cart.cartItems.find((x)=>x._id===product._id)
  //   const quantity = existItem? existItem.quantity+1 :1
  //   const {data}= await axios.get(`/api/product/$currentProduct}`)
  //   if(data.countInStock<quantity){
  //     window.alert("Sorry product out of stock")
  //   }
  //   ctxDispatch({type:"CART_ADD_ITEM", payload:{...product,quantity}})
   }
  
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

useEffect(()=>{
  products.map((prod)=>(
setProduct(prod)
  ))
},[products])

  return (
    <div>
      <Helmet><title>Componentes PC</title></Helmet>
      <Header />
      {/* <div className="main"> */}
{loading?<div><LoadingBox/></div>:error?<div><MessageBox variant="danger">{error}</MessageBox></div>:<div className="">
{/* {products.map((product)=>(
  // <ProductCarusel product={product}/>
  ))} */}

<Carusel  product={product} showRows={showRows} showScroll={showScroll} slideRef={slideRef} error={error} loading={loading}/>
{/* <Slider infinite={ products.length > 4}  prevArrow={<PrevBtn/>}
          nextArrow={<NextBtn/> }    ref={slideRef} slidesToShow={showScroll} slidesToScroll={showScroll} rows={showRows} speed={500} dots={true} class="slider">
  {products.map((product) => (
  <div>
              {/* <div className="main-carusel-map">
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
            <button onClick={addToCartHandler}variant="primary" className='btn-primary'>Add to cart</button>
            </div>
        }
                  </div>
                </div> */}
                {/* <div>
                  <div className="img-caruel-container">
                    <img className="img-carusels"  src={product.image} alt="img"/>
                  </div>
                </div>
            </div>
          ))}
  </Slider>  */}

  </div>}
      {/* </div> */}

    </div>
  );
};

export default Home;
