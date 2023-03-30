import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import Rating from '../../components/rating/Rating';
import { getError } from '../../components/utils';
import { Store } from '../../Store';
import "./productScreen.css"

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

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;


const {state, dispatch:ctxDispatch}=useContext(Store)

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
        const result = await axios.get(`/api/product/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        dispatch({type:"SAVED_PRODUCT",payload:result.data})
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload:getError (err) });
      }
    };

    fetchData();
  }, [slug]);


  const addToCartHandler = async() => {
    const existItem=cart.cartItems.find((x)=>x._id===product._id)
    const quantity = existItem? existItem.quantity+1 :1
    const {data}= await axios.get(`/api/product/${product._id}`)
    if(data.countInStock<quantity){
      window.alert("Sorry product out of stock")
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity},
    });
  };
  return (
    <div>
              <Header/>

      {loading ? (
        <div>
        <LoadingBox/>
        </div>
      ) : error ? (
        <div>
          <MessageBox variant="danger">{error}</MessageBox>
        </div>
      ) : (
        <div>
        <div className='product-main-div'>
          <div className='img-product'>
            <img src={product.image} alt="img" />
            </div>
            <div>
              <div>
                <Helmet><title>{product.name}</title></Helmet>
              <p>{product.name}</p>

                </div>
                <div>
                  <p>STATUS :</p>
              <span>{product.countInStock>0? <p>In stock</p>:<p>Out of stock</p>}</span>
                </div>
            <div>
        <p>PRICE :</p>
          <span>{product.price} €</span>
          </div>
          <div>
            <Rating rating={product.rating} numReviews={product.numReviews}/>
          </div>
          {product.countInStock >0 &&
          <div>
            <button onClick={addToCartHandler}variant="primary" className='btn-primary'>Add to cart</button>
            </div>
        }
          </div>
        </div>
        </div>

      )}
    </div>
  );

};

export default ProductScreen;
