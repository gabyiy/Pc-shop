import React,{useContext,useReducer,useEffect, useState} from 'react'
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../components/utils';
import { useNavigate } from 'react-router-dom';



const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_RRQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, product: action.payload };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
const AddProductButton = (props) => {
    const {state, dispatch:ctxDispatch}=useContext(Store)
    const [stock,setStock]=useState(true)

const {cart}= state

  const [{ product, error, loading }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/product/slug/${props.productSlug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        dispatch({type:"SAVED_PRODUCT",payload:result.data})
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload:getError (err) });
      }
    };
    fetchData();
  }, [props.productSlug]);


    const addToCartHandler = async() => {
        const existItem=cart.cartItems.find((x)=>x._id===props.productId)
        const quantity = existItem? existItem.quantity+1 :1
        const {data}= await axios.get(`/api/product/${props.productId}`)
        if(data.countInStock<quantity){
          window.alert("Sorry product out of stock")
          setStock(false)
        }else{
          setStock(true)
        }
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...product, quantity},
        });
        console.log(product.quantity)
      };
  return (
    <div>
      {
         stock ?
                           <button onClick={addToCartHandler}variant="primary" className='btn-primary'>Add Product</button>
:
        <button variant="light" disabled>Out of stock</button>
      }
    </div>
  )
}

export default AddProductButton
