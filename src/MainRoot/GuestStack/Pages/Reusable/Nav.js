import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import Popup from "../Reusable/Popup";

// Static images
import companyLogo from "../../../../Images/logo.png";

export default function NavComponent({
  cartItemsArr,
  currentCatalogFilter,
  setCurrentCatalogFilter,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const [navbarIsToggled, setNavbarIsToggled] = useState(false);

  // sticky navbar
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 190) ||
          currentScrollPos < 190
      );

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  //

  // catalog filters
  const catalogFilters = [
    "ფასდაკლებები",
    "ელექტრო პროდუქცია",
    "კლიმატური ტექნიკა",
    "სანტექნიკა",
    "ინსტრუმენტები",
    "მშენებლობა",
    "სხვადასხვა",
  ];
  //

  // cart component
  // const removeCartItem = (item) => {

  // };

  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartComponent = (
    <div className="cart-items">
      {cartItemsArr.map((item, index) => {
        return (
          <div className="cart-item" key={item.id + index * 10} id={item.id}>
            <div className="cart-item-inner-div">
              <img src={item.imgSrc} alt={companyLogo}></img>
              <div>
                <p>{item.name}</p>
                <p>{item.price + "₾"}</p>
              </div>
            </div>
            <FontAwesomeIcon icon={faMinus} />
          </div>
        );
      })}
    </div>
  );

  //

  return (
    <div style={{ position: visible ? "" : "sticky", zIndex: "100", top: "0" }}>
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
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            setNavbarIsToggled(!navbarIsToggled);
            setDropdownIsVisible(false);
          }}
        />
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
                <img
                  src={companyLogo}
                  alt="Mr Shine"
                  style={{ width: "70px" }}
                ></img>
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
              onClick={() => {
                setIsCartVisible(true);
              }}
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
                <p>{cartItemsArr.length}</p>
              </div>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <nav
        className="Nav2"
        onClick={() => {
          if (window.location.pathname !== "/") {
            window.location.pathname = "/";
          }
        }}
      >
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
              if (!navbarIsToggled) {
                setDropdownIsVisible(!dropdownIsVisible);
              }
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
          <div
            className="filter-dropdown"
            style={{
              display: dropdownIsVisible ? "flex" : "none",
            }}
          >
            {catalogFilters.map((filter, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log(filter);
                    if (currentCatalogFilter === filter) {
                      setCurrentCatalogFilter(null);
                    } else {
                      setCurrentCatalogFilter(filter);
                    }
                  }}
                  style={{
                    backgroundColor:
                      filter === currentCatalogFilter ? "white" : "",
                    color: filter === currentCatalogFilter ? "black" : "white",
                    opacity: filter === currentCatalogFilter ? "0.8" : "1",
                  }}
                >
                  {filter}
                </div>
              );
            })}
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
                ძებნა
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
          <p>(+995) 558-500-508</p>
        </div>
      </nav>
      <Popup
        visible={isCartVisible}
        className="cart-container"
        onClose={() => {
          setIsCartVisible(false);
        }}
        children={
          cartItemsArr?.length === 0 ? "კალათა ცარიელია" : cartComponent
        }
      />
    </div>
  );
}
