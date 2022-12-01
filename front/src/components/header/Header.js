import React, { useState } from "react";
import Search from "../search/Search";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const view1 = useMediaQuery({
    query: "(max-width:800px)",
  });

  return (
    <div>
      <div className="master-div">
        {view1 ? (
          <div className="burger" onClick={() => setShow(!show)}>
            Burger
          </div>
        ) : (
          ""
        )}
        <div className="title-and-img">
          <div>img</div>
          <div>Pc</div>
          <div>Parts</div>
        </div>
        <div>{!view1 ? <Search view={view1} /> : ""}</div>
        <div className="account-cart-comitment">
          <div className="details">Comintments</div>
          <div className="details">My account</div>
          <div className="details">My Cart</div>
        </div>
      </div>
      <div>{view1 ? <Search view={view1} /> : ""}</div>
      <div className="toggle-all-cat" onClick={() => setShow(!show)}>
        {!view1 ? <p>Todas las categorias</p> : ""}
      </div>
      {show ? (
        <div className="blur">
          <div className="all-category">lol</div>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
