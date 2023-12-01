import logo from "../../../../Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Select } from "antd";

const Product = ({ item, showItemInfo, addItemToCart, index }) => {
  return (
    <div
      className={`shopping-good ${item.inStock ? "" : "out-of-stock"}`}
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
                {(item.price * (100 - item.reducedPricePercentage)) / 100 + "₾"}
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
};

const ProductInfo = (
  id,
  name,
  imgSrc,
  price,
  reducedPricePercentage,
  description,
  category,
  code,
  inStock,
  addItemToCart,
  chosenItem,
  forAdmin,
  handleCategoryValueChange,
  categoryValue
) => {
  // handling value changes for admin
  // values:

  // name
  const [nameValue, setNameValue] = useState(null);
  const handleNameValueChange = (e) => {
    setNameValue(e.target.value);
  };
  //

  // img
  const [imageSrc, setImageSrc] = useState("");
  const [uploadMode, setUploadMode] = useState(false);
  const handleImageClick = () => {
    if (forAdmin) {
      setUploadMode(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
      setUploadMode(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //

  // price
  const [priceValue, setPriceValue] = useState("");
  const handlePriceValueChange = (e) => {
    setPriceValue(e.target.value);
  };
  //

  // discount
  const [reducedPriceInputValue, setReducedPriceInputValue] = useState("");

  const handleReducedPriceInputValueChange = (e) => {
    let userInput = e.target.value.replace(/[^0-9]/g, "");
    userInput = userInput === "" ? "0" : Math.min(parseInt(userInput, 10), 100);
    setReducedPriceInputValue(userInput);
  };

  const handleInputFocus = (e) => {
    const length = reducedPriceInputValue.length;
    const position = Math.max(length, 1);
    e.target.setSelectionRange(position, position);
  };
  //

  // description
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleDescriptionValueChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  //

  // category
  const { Option: CategoryOption } = Select;

  //

  // in stock
  const [inStockValue, setInStockValue] = useState(null);
  //

  return (
    <div className="shopping-good-info" id={id}>
      <div className="shopping-good-info-innerdiv1">
        {forAdmin ? (
          <label style={{ cursor: "pointer" }}>
            <img
              src={imageSrc || imgSrc}
              alt={logo}
              onClick={handleImageClick}
              style={{
                width: "130px",
                height: "130px",
                cursor: "pointer",
              }}
            />
            {uploadMode && (
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            )}
          </label>
        ) : (
          <img src={imgSrc} alt={logo} style={{ width: "100px" }} />
        )}
        {!forAdmin ? (
          <p
            className="reduced-price-percentage"
            style={{ position: "absolute", top: "5px", left: "5px" }}
          >
            {reducedPricePercentage ? "-" + reducedPricePercentage + "%" : ""}
          </p>
        ) : (
          <input
            className="CRUD-input"
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              maxWidth: "55px",
              color: "rgb(175, 33, 33)",
              fontWeight: 800,
              fontSize: "17px",
            }}
            value={
              "-" + (reducedPriceInputValue || reducedPricePercentage) + "%"
            }
            onChange={handleReducedPriceInputValueChange}
            onFocus={handleInputFocus}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {forAdmin ? (
            <input
              placeholder="სახელი"
              className="CRUD-input"
              id="CRUD-input-name"
              value={nameValue || nameValue === "" ? nameValue : name}
              onChange={handleNameValueChange}
              style={{ fontWeight: 800, width: "60%", maxWidth: "230px" }}
            ></input>
          ) : (
            <p style={{ fontWeight: "800" }}>{name}</p>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "6px",
            }}
          >
            {forAdmin ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "1px",
                }}
              >
                <input
                  placeholder="ფასი"
                  className="CRUD-input"
                  id="CRUD-input-price"
                  style={{ maxWidth: 90, width: "50%" }}
                  onChange={handlePriceValueChange}
                  value={priceValue ? priceValue : price}
                ></input>
                <p className="admin-p-label">₾</p>
              </div>
            ) : (
              <>
                {" "}
                <p>ფასი: </p>
                <p
                  style={{
                    textDecoration: reducedPricePercentage
                      ? "line-through"
                      : "",
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
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "4px",
            }}
          >
            {forAdmin ? (
              <p
                style={{ fontWeight: "400", cursor: "pointer" }}
                onClick={() =>
                  setInStockValue((inStock) => {
                    if (inStockValue === null) {
                      inStock = !inStock; // could be better
                      return !inStock;
                    } else {
                      return !inStockValue;
                    }
                  })
                }
              >
                {inStockValue !== null
                  ? inStockValue
                    ? "მარაგშია"
                    : "ამოიწურა"
                  : inStock
                  ? "მარაგშია"
                  : "ამოიწურა"}
              </p>
            ) : (
              <p style={{ fontWeight: "400" }}>
                {inStock ? "მარაგშია" : "ამოიწურა"}
              </p>
            )}

            {inStock ? (
              <FontAwesomeIcon
                icon={faShoppingCart}
                alt={"add"}
                className="shopping-cart-add"
                id="shopping-cart-add-info"
                style={{ display: forAdmin ? "none" : "" }}
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
            rowGap: "6px",
          }}
        >
          {forAdmin ? (
            <Select
              value={!categoryValue ? category : categoryValue}
              style={{ width: 200 }}
              onChange={handleCategoryValueChange}
            >
              <CategoryOption value="ელექტრო პროდუქცია">
                ელექტრო პროდუქცია
              </CategoryOption>
              <CategoryOption value="კლიმატური ტექნიკა">
                კლიმატური ტექნიკა
              </CategoryOption>
              <CategoryOption value="სანტექნიკა">სანტექნიკა</CategoryOption>
              <CategoryOption value="ინსტრუმენტები">
                ინსტრუმენტები
              </CategoryOption>
              <CategoryOption value="მშენებლობა">მშენებლობა</CategoryOption>
              <CategoryOption value="სხვადასხვა">სხვადასხვა</CategoryOption>
            </Select>
          ) : (
            <p>კატეგორია: {category}</p>
          )}
          {forAdmin ? (
            <textarea
              className="CRUD-input"
              id="CRUD-input-description"
              value={descriptionValue ? descriptionValue : description}
              onChange={handleDescriptionValueChange}
            ></textarea>
          ) : (
            <div className="shopping-good-info-description">{description}</div>
          )}
        </div>
        <p style={{ fontWeight: "800", marginTop: "12px" }}>კოდი: {code}</p>
      </div>
    </div>
  );
};

export { ProductInfo, Product };
