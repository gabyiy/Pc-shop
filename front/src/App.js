import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SearchPage from "./pages/searchPage/SearchPage";
import ProductsScreen from "./pages/productsScreen/ProductsScreen";
import ProductScreen from "./pages/ProductScreen/ProductScreen";
import Container  from "react-bootstrap/Container"
import CartScreen from "./pages/cartScreen/CartScreen";
import SignIn from "./pages/signIn/SignIn";
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchPage" element={<SearchPage />} />
          <Route  path="/product/prod/:slug" element={<ProductScreen/>}/>

          <Route exact path="/products/:category" element={<ProductsScreen />} />
          <Route exact path ="/cartScreen" element={<CartScreen/>}/>
          <Route path="/signIn" element={<SignIn/>}/>
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
