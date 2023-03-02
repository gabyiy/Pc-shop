import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SearchPage from "./pages/searchPage/SearchPage";
import ProductsScreen from "./pages/productsScreen/ProductsScreen";
import ProductScreen from "./pages/productsScreen/ProductsScreen";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchPage" element={<SearchPage />} />
          <Route path="/product/:category" element={<ProductScreen/>}/>

          <Route path="/products/:category" element={<ProductsScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
