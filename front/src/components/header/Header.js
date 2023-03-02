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
      setUnique(  [...new Set(products.products.map(item => item.category))])
      //console.log(unique)
    }catch(err){dispatch({type:"FETCH_FAIL" ,payload:error.message})}
    }
    fetchData();  
  }, [unique]);


  const array = [
    { id: 1, name: "john" },
    { id: 1, name: "jack" },
    { id: 2, name: "mony" },
    { id: 2, name: "tony" },
    { id: 3, name: "jac" },
    { id: 4, name: "noman" },
    { id: 4, name: "tom" },
    { id: 5, name: "tommy" },
    { id: 6, name: "jick" },
    { id: 6, name: "moni" },
  ];
  
  
  const res = array.reduce((finalArray, current) => {
    let obj = finalArray.find((item) => item.id === current.id);
    if (obj) {
      return finalArray;
    }
    return finalArray.concat([current]);
  }, []);
  
  
  console.log("result :-> ", res);
  
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
  //set//UniqueProducts(products.pr)
//const diferent = [...new Set(products.products.map(q => q.category))];
//const categories = products.products.map(x => x.category);
//c/onst uniqueCategories = [...new Set(categories)]; 
//console.log(uniqueCategories)
// const filterProducts = products.filter(product=>
//   product.category==="Ram")

let list = [1,1,3,4,3,5]
const noDup=[...new Set(list)]

const arr = [
  {label: 'All', value: 'All'},
  {label: 'All', value: 'All'},
  {label: 'Alex', value: 'Ninja'},
  {label: 'Bill', value: 'Op'},
  {label: 'Cill', value: 'iopop'}
]

var result = arr.reduce((unique, o) => {
  if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
    unique.push(o);
  }
  return unique;
},[]);
console.log(result);
useEffect(()=>{
 //setUniqueProducts (Array.from( products.products.reduce((map,obj)=>map.set(obj.category,obj),new Map().values())))

},[loading])

  console.log( uniqueProducts)
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
