import logo from "../../../Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Reusable/Popup";
import { useState } from "react";

export default function Home({ setCartItems }) {
  const shoppingGoods = [
    {
      id: 1,
      imgSrc: logo,
      name: "პროდუქტი 1",
      description: "ძალიან კარგი პროდუქტი",
      price: 740,
      reducedPricePercentage: 60,
      isPinned: false,
      category: "ინსტრუმენტები",
      code: "26442",
      inStock: true,
    },
    {
      id: 2,
      imgSrc: logo,
      name: "პროდუქტი 2",
      description: "ძალიან კარგი პროდუქტი",
      price: 10,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "ინსტრუმენტები",
      code: "18562",
      inStock: true,
    },
    {
      id: 3,
      imgSrc: logo,
      name: "პროდუქტი 3",
      description: "ძალიან კარგი პროდუქტი",
      price: 405,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "მშენებლობა",
      code: "42423",
      inStock: true,
    },
    {
      id: 4,
      imgSrc: logo,
      name: "პროდუქტი 4",
      description: "ძალიან კარგი პროდუქტი",
      price: 100,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "სხვადასხვა",
      code: "97212",
      inStock: true,
    },
    {
      id: 5,
      imgSrc: logo,
      name: "პროდუქტი 5",
      description: "ძალიან კარგი პროდუქტი",
      price: 230,
      reducedPricePercentage: 0,
      isPinned: true,
      category: "კლიმატური ტექნიკა",
      code: "12412",
      inStock: true,
    },
    {
      id: 6,
      imgSrc: logo,
      name: "პროდუქტი 6",
      description: "ძალიან კარგი პროდუქტი",
      price: 40,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "სანტექნიკა",
      code: "78712",
      inStock: true,
    },
    {
      id: 7,
      imgSrc: logo,
      name: "პროდუქტი 7",
      description: "ძალიან კარგი პროდუქტი",
      price: 300,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "ელექტრონული ტექნიკა",
      code: "40292",
      inStock: true,
    },
    {
      id: 8,
      imgSrc: logo,
      name: "პროდუქტი 8",
      description: "ძალიან კარგი პროდუქტი",
      price: 60,
      reducedPricePercentage: 5,
      isPinned: true,
      category: "ინსტრუმენტები",
      code: "31619",
      inStock: true,
    },
    {
      id: 9,
      imgSrc: logo,
      name: "პროდუქტი 9",
      description: "ძალიან კარგი პროდუქტი",
      price: 50,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "სანტექნიკა",
      code: "06232",
      inStock: false,
    },
    {
      id: 10,
      imgSrc: logo,
      name: "პროდუქტი 10",
      description: "ძალიან კარგი პროდუქტი",
      price: 620,
      reducedPricePercentage: 50,
      isPinned: true,
      category: "სანტექნიკა",
      code: "12400",
      inStock: true,
    },
    {
      id: 11,
      imgSrc: logo,
      name: "პროდუქტი 11",
      description: "ძალიან კარგი პროდუქტი",
      price: 100,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "მშენებლობა",
      code: "66212",
      inStock: false,
    },
    {
      id: 12,
      imgSrc: logo,
      name: "პროდუქტი 12",
      description: "ძალიან კარგი პროდუქტი",
      price: 400,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "სხვადასხვა",
      code: "99245",
      inStock: true,
    },
    {
      id: 13,
      imgSrc: logo,
      name: "პროდუქტი 13",
      description: "ძალიან კარგი პროდუქტი",
      price: 122,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "სანტექნიკა",
      code: "62368",
      inStock: true,
    },
    {
      id: 14,
      imgSrc: logo,
      name: "პროდუქტი 14",
      description: "ძალიან კარგი პროდუქტი",
      price: 10,
      reducedPricePercentage: 20,
      isPinned: true,
      category: "მშენებლობა",
      code: "47442",
      inStock: false,
    },
    {
      id: 15,
      imgSrc: logo,
      name: "პროდუქტი 15",
      description: "ძალიან კარგი პროდუქტი",
      price: 140,
      reducedPricePercentage: 0,
      isPinned: false,
      category: "კლიმატური ტექნიკა",
      code: "12152",
      inStock: true,
    },
    {
      id: 16,
      imgSrc: logo,
      name: "პროდუქტი 16",
      description: "ძალიან კარგი პროდუქტი",
      price: 100,
      reducedPricePercentage: 20,
      isPinned: true,
      category: "სანტექნიკა",
      code: "12412",
      inStock: false,
    },
  ];

  // shopping cart
  const addItemToCart = (item) => {
    let cartArr = JSON.parse(localStorage.getItem("@cartArr")) || [];
    if (!Array.isArray(cartArr)) {
      cartArr = [];
    }
    cartArr.push(item);
    localStorage.setItem("@cartArr", JSON.stringify(cartArr));
    setCartItems(cartArr);
  };
  //

  // item info
  const [isItemInfoVisible, setIsItemInfoVisible] = useState(false);
  const [chosenItem, setChosenItem] = useState(null);
  const showItemInfo = (item) => {
    setChosenItem(item);
    setIsItemInfoVisible(true);
  };
  const closeItemInfo = () => {
    setChosenItem(null);
    setIsItemInfoVisible(false);
  };

  const itemInfoComponent = (
    id,
    name,
    imgSrc,
    price,
    reducedPricePercentage,
    description,
    category,
    code,
    inStock
  ) => {
    return (
      <div className="shopping-good-info" id={id}>
        <div className="shopping-good-info-innerdiv1">
          <img src={imgSrc} alt={logo}></img>
          <p
            className="reduced-price-percentage"
            style={{ position: "absolute", top: "5px", left: "5px" }}
          >
            {reducedPricePercentage ? "-" + reducedPricePercentage + "%" : ""}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ fontWeight: "800" }}>{name}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "6px",
              }}
            >
              <p>ფასი: </p>
              <p
                style={{
                  textDecoration: reducedPricePercentage ? "line-through" : "",
                  opacity: reducedPricePercentage ? "0.7" : "1",
                }}
              >
                {price + "₾"}
              </p>
              {reducedPricePercentage ? (
                <p style={{ fontSize: "21px" }}>
                  {(price * (100 - reducedPricePercentage)) / 100 + "₾"}
                </p>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "4px",
              }}
            >
              <p style={{ fontWeight: "400" }}>
                {inStock ? "მარაგშია" : "ამოიწურა"}
              </p>
              {inStock ? (
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  alt={"add"}
                  className="shopping-cart-add"
                  id="shopping-cart-add-info"
                  onClick={() => {
                    if (inStock) {
                      addItemToCart(chosenItem);
                    }
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="shopping-good-info-innerdiv2">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontWeight: "800", marginTop: "12px" }}>კოდი: {code}</p>
            <div className="shopping-good-info-description">{description}</div>
          </div>
          <p>კატეგორია: {category}</p>
        </div>
      </div>
    );
  };
  //

  return (
    <div className="Home">
      <div className="shopping-goods-container">
        {shoppingGoods.map((item, index) => {
          return (
            <div
              className={`shopping-good ${item.inStock ? "" : "out-of-stock"}`}
              key={item.id + index}
              id={item.id}
              onClick={() => showItemInfo(item)}
            >
              {item.inStock ? null : (
                <div className="out-of-stock-overlay">ამოიწურა</div>
              )}
              <div className="shopping-good-innerdiv1">
                <img src={item.imgSrc} alt={logo}></img>
                {item.isPinned ? (
                  <FontAwesomeIcon
                    icon={faThumbtack}
                    style={{
                      position: "absolute",
                      transform: "translate(-10px, 10px)",
                    }}
                  />
                ) : (
                  ""
                )}
                {item.reducedPricePercentage ? (
                  <p
                    className="reduced-price-percentage"
                    style={{ position: "absolute", top: "5px" }}
                  >
                    {"-" + item.reducedPricePercentage + "%"}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="shopping-good-innerdiv2">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "3px",
                  }}
                >
                  <p className="shopping-good-name">{item.name}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "8px",
                    }}
                  >
                    <p
                      className="shopping-good-price"
                      style={{
                        textDecoration: item.reducedPricePercentage
                          ? "line-through"
                          : "",
                        opacity: item.reducedPricePercentage ? "0.7" : "1",
                      }}
                    >
                      {item.price + "₾"}
                    </p>
                    {item.reducedPricePercentage ? (
                      <p className="shopping-good-price">
                        {(item.price * (100 - item.reducedPricePercentage)) /
                          100 +
                          "₾"}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  alt="add"
                  className="shopping-cart-add"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (item.inStock) {
                      addItemToCart(item);
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Popup
        visible={isItemInfoVisible}
        onClose={closeItemInfo}
        children={itemInfoComponent(
          chosenItem?.id,
          chosenItem?.name,
          chosenItem?.imgSrc,
          chosenItem?.price,
          chosenItem?.reducedPricePercentage,
          chosenItem?.description,
          chosenItem?.category,
          chosenItem?.code,
          chosenItem?.inStock
        )}
      />
    </div>
  );
}
