import React, { useContext } from 'react'
import "./CartScreen.css"
import { Store } from '../../Store'
import { Helmet } from 'react-helmet-async'
import MessageBox from '../../components/messageBox/MessageBox'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from 'bootstrap'
import axios from "axios"

const CartScreen = () => {
  const navigate = useNavigate()
    const {state,dispatch:ctxDispatch}= useContext(Store)
    const{
        cart:{cartItems},
    }=state

    const updateCartHandler =async(item,quantity)=>{
const {data}= await axios.get(`/api/product/${item._id}`)
if (data.countInStock <quantity){
  window.alert("Product out of stock")
  return
}
ctxDispatch({ type:"CART_ADD_ITEM",payload :{...item,quantity}})
    }

    const removeCartItemHandler=(item)=>{
      ctxDispatch ({ type :"CART_REMOVE_ITEM" ,payload:item})
    }
    
    const checkoutHandler=()=>{
navigate('/signin?redirect=/shipping')
    }
  return (
    <div>
      <Helmet><title>Caro de compras</title></Helmet>
      <div>
        {cartItems.length===0?
      <MessageBox>
  Cart is empty <Link to="/">Go shopping</Link>
      </MessageBox>  :
      <div>
{cartItems.map((item)=>(

  <div key ={item._id}>
    <div>
      <img src={item.image} alt='img'/>
      </div>
      <div>
        <Link to={`/product/prod/${item.slug}`}>{item.name}</Link>
        <button onClick={()=>updateCartHandler(item, item.quantity -1)} variant="light" disabled={item.quantity===1}>
          <i className='fas fa-minus-circle'></i>
        </button>{" "}
        <span>{item.quantity}</span>{" "}
        <button onClick={()=>updateCartHandler(item, item.quantity +1)}
        variant="light" disabled={item.quantity===item.countInStock}>
          <i className='fas fa-plus-circle'></i>
        </button>{" "}
        <span>{item.price}</span>
        <button onClick={()=>removeCartItemHandler(item)} variant="light" disabled={item.quantity===1}>
          <i className='fas fa-trash'></i>
        </button>{" "}
      </div>
  </div>
))}
</div>
      }
      <div>
       <h3>
        Subtotal({cartItems.reduce((a,c)=>a+c.quantity,0)}{" "}items): $
        {cartItems.reduce((a,c)=>a+c.price*c.quantity,0)}
        </h3> 
      </div>
      <div>
        <button type='button' onClick={checkoutHandler} variant="primary" disabled={cartItems.length===0}>Proceed to checkout</button>
      </div>
      </div>
    </div>
  )
}

export default CartScreen
