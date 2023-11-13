import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Input, Button } from "antd";

export default function NavComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        style={{
          paddingLeft: "60px",
          paddingRight: "60px",
          minHeight: "110px",
        }}
        className="Nav1"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ml-auto"
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="Inner-Nav">
              <Nav.Link as={Link} to="/">
                აქ წავა რაღაც ლოგო
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                მთავარი
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                ჩვენს შესახებ
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                კონტაქტი
              </Nav.Link>
            </div>

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
      <nav className="Nav2">
        <div style={{ display: "flex", alignItems: "center", width: "55%" }}>
          <div
            className="Nav2-Inner-Div"
            style={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setDropdownIsVisible(true);
            }}
          >
            <FontAwesomeIcon
              icon="bars"
              style={{ color: "white" }}
              className="Hamburger"
            />
            <p>კატალოგი</p>
            <FontAwesomeIcon
              icon="angle-down"
              style={{ color: "white" }}
              id="arrow-down"
            />
          </div>
          <Input.Search
            placeholder="მოძებნე პროდუქტი"
            style={{ minWidth: "320px", maxWidth: "550px", width: "75%" }}
            // onSearch={handleSearch}
            enterButton={
              <Button
                type="primary"
                style={{
                  marginLeft: "15px",
                  backgroundColor: "rgb(137, 59, 59)",
                }}
                id="search-button"
              >
                Search
              </Button>
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "45%",
            justifyContent: "flex-end",
          }}
          className="Nav2-Inner-Div2"
        >
          {/* User profile coming soon */}
          <p>ზაზას ნომერი</p>
        </div>
      </nav>
    </div>
  );
}
