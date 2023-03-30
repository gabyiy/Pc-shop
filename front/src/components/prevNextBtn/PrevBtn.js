import React from 'react'
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew'
import "./PrevBtn.css"

const PrevBtn = (props) => {
    const {className, onClick}=props

  return (
    <div  className={`arrowBackBtn ${className}`} onClick={onClick}>
        <ArrowBackIosNew />
    </div>
  )
}

export default PrevBtn
