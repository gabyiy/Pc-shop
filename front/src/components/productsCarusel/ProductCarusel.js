import React from 'react'
import "./ProductCarusel.css"

const ProductCarusel = (props) => {
    
  return (
    <div className='main-div'>
      <div className='main-div'> 
        <div>   
          <img src={props.product.image} alt ="img"/>
        </div>
      </div>
    </div>
  )
}

export default ProductCarusel
