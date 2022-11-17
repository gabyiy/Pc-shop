import React from "react";
import Search from "../search/Search";
import "./Header.css";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Header = () => {
  const view1 = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div className="master-div">
      <div className="title-and-img">
        <div>img</div>
        <div>Pc</div>
        <div>Parts</div>
      </div>
      <div>
        {!view1 ? <Search view={view1} /> : <Link to={"/searchPage"}>lol</Link>}
      </div>
      <div>
        <div>Comintments</div>
        <div>My account</div>
        <div>My Cart</div>
      </div>
    </div>
  );
};

export default Header;
