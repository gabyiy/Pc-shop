import React from 'react'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import "./NextBtn.css"

const NextBtn = (props) => {
  console.log(props)
    const {className, onClick}=props
    return (
      <div className= {`arrowForwordBtn ${className} ` }onClick={onClick}>
          <ArrowForwardIos/>
      
    </div>
  )
}

export default NextBtn
