import logo from "../../../../Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { Cloudinary } from "cloudinary-core";

const Product = ({ item, showItemInfo, addItemToCart, forAdmin }) => {
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
                {Math.ceil(
                  (item.price * (100 - item.reducedPricePercentage)) / 100
                ) + "₾"}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <FontAwesomeIcon
          icon={faShoppingCart}
          alt="add"
          style={{ display: forAdmin ? "none" : "" }}
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
  code,
  inStock,
  isPinned,
  addItemToCart,
  chosenItem,
  forAdmin,
  handleCategoryValueChange,
  categoryValue,
  create_or_update,
  isItemInfoVisible
) => {
  // dependencies:
  const cloudinary = new Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_API_KEY,
  });

  // handling value changes for admin
  // values:

  // name
  const [nameValue, setNameValue] = useState(name);
  const handleNameValueChange = (e) => {
    setNameValue(e.target.value);
  };
  //

  // img
  const [imageObject, setImageObject] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [uploadMode, setUploadMode] = useState(false);
  const handleImageClick = () => {
    if (forAdmin) {
      setUploadMode(true);
    }
  };

  const handleImageObjectChange = (e) => {
    const file = e.target.files[0];
    setImageObject(file);

    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImageSrc(objectURL);
    }
  };
  const handleImgUploadToCloud = async () => {
    if (imageObject) {
      try {
        const formData = new FormData();

        const compressedImage = await compressImage(imageObject);

        formData.append("file", compressedImage);

        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            cloudinary.config().cloud_name
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const responseData = await response.json();
        const imageUrl = responseData.secure_url;

        return imageUrl;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return null;
      }
    }

    return null;
  };

  // compress img to reduce size
  const compressImage = async (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.7
        );
      };
    });
  };
  //

  // price
  const [priceValue, setPriceValue] = useState(price);
  const handlePriceValueChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    const limitedValue = newValue.slice(0, 5);
    setPriceValue(Number(limitedValue));
  };
  //

  // discount
  const [reducedPriceInputValue, setReducedPriceInputValue] = useState(0);

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
  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleDescriptionValueChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  //

  // category
  const { Option: CategoryOption } = Select;

  //

  // in stock
  const [inStockValue, setInStockValue] = useState(chosenItem?.inStock);
  const handleInStockValueChange = () => {
    setInStockValue(!inStockValue);
  };
  //

  // is pinned
  const [isPinnedValue, setIsPinnedValue] = useState(isPinned);
  const handleIsPinnedValueChange = () => {
    setIsPinnedValue(!isPinnedValue);
  };
  //

  const C_or_I = async (C_or_I) => {
    if (C_or_I === "C") {
      try {
        const uploadedImageSrc = await handleImgUploadToCloud();

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URI}/admin/productscreate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameValue,
              price: priceValue,
              description: descriptionValue,
              imgSrc: uploadedImageSrc,
              reducedPricePercentage: reducedPriceInputValue,
              isPinned: true, // fix
              category: categoryValue,
              code: "0000",
              inStock: false, // fix
            }),
          }
        );

        if (response.ok) {
          console.log("Product created successfully!");
          window.location.reload();
        } else {
          console.error("Failed to create product.");
        }
      } catch (error) {
        console.error("Error creating product:", error);
      }
    } else {
      try {
        const uploadedImageSrc = imageSrc
          ? await handleImgUploadToCloud()
          : null;

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URI}/admin/productsupdate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: id,
              name: nameValue,
              price: priceValue,
              description: descriptionValue,
              imgSrc: uploadedImageSrc ? uploadedImageSrc : imgSrc,
              reducedPricePercentage: reducedPriceInputValue,
              isPinned: true, // fix
              category: categoryValue,
              code: "0000",
              inStock: false, // fix
            }),
          }
        );

        if (response.ok) {
          console.log("Product changed successfully!");
          window.location.reload();
        } else {
          console.error("Failed to change product.");
        }
      } catch (error) {
        console.error("Error changing product:", error);
      }
    }
  };

  useEffect(() => {
    console.log(chosenItem?.inStock, chosenItem?.isPinned);
  }, [chosenItem]);
  // resetting values for Product-s
  const [testId, setTestId] = useState(null);
  useEffect(() => {
    if (isItemInfoVisible === false) {
      setTestId(id);
    }
    if (!testId) {
      if (testId !== id) {
        setNameValue(name);
        setPriceValue(price);
        setReducedPriceInputValue(reducedPricePercentage);
        setDescriptionValue(description);
        setInStockValue(inStock);
        setIsPinnedValue(isPinned);
        setImageSrc(imgSrc);
      }
    }
  }, [
    id,
    isItemInfoVisible,
    name,
    price,
    reducedPricePercentage,
    description,
    inStock,
    isPinned,
    imgSrc,
    testId,
  ]);

  return (
    <div className="shopping-good-info" id={id}>
      <div className="shopping-good-info-innerdiv1">
        {forAdmin ? (
          <label style={{ cursor: "pointer" }}>
            <img
              src={imageSrc || imgSrc}
              alt={imageSrc || imgSrc}
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
                onChange={handleImageObjectChange}
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
                  value={priceValue || priceValue === 0 ? priceValue : price}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{ fontWeight: "400", cursor: "pointer" }}
                  onClick={() =>
                    setInStockValue((inStock) => {
                      handleInStockValueChange();
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
                <p
                  style={{ fontWeight: "400", cursor: "pointer" }}
                  onClick={() =>
                    setIsPinnedValue((isPinned) => {
                      handleIsPinnedValueChange();
                      if (isPinnedValue === null) {
                        isPinned = !isPinned;
                        return !isPinned;
                      } else {
                        return !isPinnedValue;
                      }
                    })
                  }
                >
                  {chosenItem?.isPinned ? "დაპინულია" : "არაა დაპინული"}
                </p>
              </div>
            ) : (
              <p style={{ fontWeight: "400" }}>
                {(inStockValue !== undefined) & chosenItem?.inStock
                  ? "მარაგშია"
                  : inStockValue
                  ? "მარაგშია"
                  : "ამოიწურა"}
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
              value={categoryValue}
              style={{ width: 200 }}
              onChange={handleCategoryValueChange}
              placeholder="კატეგორია"
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
            <p>კატეგორია: {categoryValue}</p>
          )}
          {forAdmin ? (
            <textarea
              className="CRUD-input"
              id="CRUD-input-description"
              placeholder="აღწერა"
              value={
                descriptionValue || descriptionValue === ""
                  ? descriptionValue
                  : description
              }
              onChange={handleDescriptionValueChange}
            ></textarea>
          ) : (
            <div className="shopping-good-info-description">{description}</div>
          )}
        </div>
        {forAdmin ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {/* <p style={{ fontWeight: "800", marginTop: "12px" }}>კოდი: {code}</p> */}
            <button
              className="buy-items-btn"
              onClick={() => C_or_I(create_or_update)}
            >
              შენახვა
            </button>
          </div>
        ) : (
          // <p style={{ fontWeight: "800", marginTop: "12px" }}>კოდი: {code}</p>
          ""
        )}
      </div>
    </div>
  );
};

export { ProductInfo, Product };
