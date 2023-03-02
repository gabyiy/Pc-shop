import React, { useEffect, useReducer, useState } from "react";
import Search from "../search/Search";
import "./Header.css";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "react-bootstrap/Badge";
import data from "../data";
import axios from "axios";

const reducer =(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return {...state,loading:true}
      case "FETCH_SUCCESS":
        return {...state, products:action.payload, loading:false}
      case "FETCH_FAIL":
        return{...state, error: action.payload,loading:false}
        default :
        return state
  }
}


const Header = () => {
  const [ uniqueProducts,setUniqueProducts]= useState([])
const [unique,setUnique]=useState([])
const [{loading, error,products},dispatch]=useReducer(reducer,{
  products:[],
  loading:true,
  error:""

})
  useEffect(() => {
    dispatch({type :"FETCH_REQUEST"})
    const fetchData = async () => {

    try{ 
      const result = await axios.get("/api/products");
      dispatch({type:"FETCH_SUCCESS",payload:result.data })
    
    }catch(err){dispatch({type:"FETCH_FAIL" ,payload:error.message})}
    }
    fetchData();  
  }, [unique]);


 
  
  
  const [show, setShow] = useState(false);
  const view1 = useMediaQuery({
    query: "(max-width:800px)",
  });

  const [components, setComponents] = useState(false);
  const [ordenadores, setOrdenadores] = useState(false);

  const compoentActivator = () => {
    setComponents(true);
    setOrdenadores(false);
  };
  const ordenadoresActivator = () => {
    setComponents(false);
    setOrdenadores(true);
  };
 


useEffect(()=>{
 setUniqueProducts (products.products)

},[loading])

  return (
    <div>
      <div className="master-div">
        {view1 ? (
          <div className="burger" onClick={() => setShow(!show)}>
            <MenuIcon />
          </div>
        ) : (
          ""
        )}
        <div className="title-and-img">
          <img
            className="logo-img"
            src="https://www.shutterstock.com/image-photo/computer-hardware-configuration-laid-out-600w-1915366039.jpg"
            alt="logo"
          />
          <div>
            <div className="pc">Pc</div>
            <div className="parts">Parts</div>
          </div>
        </div>
        <div>{!view1 ? <Search view={view1} /> : ""}</div>
        <div className="account-cart-comitment">
          <div className="details">Comintments</div>
          <div className="details">My account</div>
          <div className="details">
            My Cart <Badge bg="danger">9</Badge>
          </div>
        </div>
      </div>
      <div>{view1 ? <Search view={view1} /> : ""}</div>
      <div className="toggle-all-cat" onClick={() => setShow(!show)}>
        {!view1 ? (
          <div className="all-category">
            {" "}
            <MenuIcon />
            <p>Todas las categorias</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {show ? (
        <div className="blur">
          <div className="first-cat">
            <div onClick={() => compoentActivator()}>
              <p>Componentes</p>
            </div>
            <div onClick={() => ordenadoresActivator()}>Ordenadores</div>
          </div>{" "}
          <div className="second-cat">
            {components ? (
              <div>
              { 
            uniqueProducts.filter( (ele, ind) => ind === uniqueProducts.findIndex( elem => elem.category === ele.category )).map((comp)=> (
                  <Link to={`/products/${comp.category}`} key={comp.slug}>
                    <p>{comp.category}</p>
                  </Link>
               ))}
              </div>
            ) : (
              ""
            )}
            {ordenadores ? (
              <div>
                <p>Ordenadores</p>
              </div>
            ) : (
              ""
            )}
          </div>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
