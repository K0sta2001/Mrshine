import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function NavComponent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ paddingLeft: "50px", paddingRight: "50px" }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className="ml-auto"
          style={{ columnGap: "35px", alignItems: "center" }}
        >
          <Nav.Link as={Link} to="/">
            აქ წავა რაღაც ლოგო
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
          <button
            className="Shopping-Cart"
            onMouseOver={() => {
              setIsHovered(true);
            }}
            onMouseOut={() => {
              setIsHovered(false);
            }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ color: isHovered ? "white" : "black" }}
            />
            <div>
              <p style={{ color: isHovered ? "white" : "black" }}>Cart</p>
              <p>0</p>
            </div>
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
