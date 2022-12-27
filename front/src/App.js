import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SearchPage from "./pages/searchPage/SearchPage";
import ProductScreen from "./pages/productScreen/ProductScreen";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchPage" element={<SearchPage />} />
          <Route path="/product/:name" element={<ProductScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
