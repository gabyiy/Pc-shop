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
import MenuIcon from "@mui/icons-material/Menu";

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
          <div className="details">My Cart</div>
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
          <div className="first-cat">lol</div>{" "}
          <div className="second-cat">gg</div>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
