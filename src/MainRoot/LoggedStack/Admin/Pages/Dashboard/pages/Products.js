import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Spin, Button } from "antd";
import {
  Product,
  ProductInfo,
} from "../../../../../GuestStack/Pages/Reusable/Product";
import Popup from "../../../../../GuestStack/Pages/Reusable/Popup";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [chosenItem, setChosenItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URI}/user/products`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [categoryValue, setCategoryValue] = useState(null);
  const handleCategoryValueChange = (value) => {
    setCategoryValue(value);
  };

  // item info CRUD
  const [isCreationPopupVisible, setIsCreationPopupVisible] = useState(false);
  const [isItemInfoVisible, setIsItemInfoVisible] = useState(null);

  useEffect(() => {
    if (isItemInfoVisible) {
      setCategoryValue(chosenItem.category);
    } else {
      setCategoryValue(null);
    }
  }, [chosenItem, isItemInfoVisible]);


  return (
    <div className="Admin-Products">
      <p>პროდუქტები</p>
      <div className="Admin-Products-Container">
        {loading ? (
          <Spin size="large" />
        ) : (
          products?.map((item, index) => (
            <Product
              item={item}
              showItemInfo={() => {
                setIsItemInfoVisible(true);
                setChosenItem(item);
              }}
              key={item._id + index}
            />
          ))
        )}
        <div
          onClick={() => {
            setIsCreationPopupVisible(true);
          }}
          style={{
            border: "1px solid #1890ff",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            maxWidth: "170px",
            width: "50%",
            height: "180px",
          }}
        >
          <Button
            type="default"
            shape="circle"
            icon={<PlusOutlined />}
            style={{
              border: "1px solid #1890ff",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
      <Popup
        visible={isCreationPopupVisible}
        onClose={() => {
          setCategoryValue(null);
          setIsCreationPopupVisible(false);
        }}
        modalClass="item-info-popup-component"
        children={ProductInfo(
          "",
          "",
          "",
          "",
          0,
          "",
          "",
          true,
          true,
          "",
          "",
          true,
          handleCategoryValueChange,
          categoryValue,
          "C"
        )}
      />
      <Popup
        visible={isItemInfoVisible}
        onClose={() => {
          setIsItemInfoVisible(false);
          setChosenItem(null);
        }}
        children={ProductInfo(
          chosenItem?._id,
          chosenItem?.name,
          chosenItem?.imgSrc,
          chosenItem?.price,
          chosenItem?.reducedPricePercentage,
          chosenItem?.description,
          chosenItem?.code,
          chosenItem?.inStock,
          chosenItem?.ispinned,
          null,
          chosenItem,
          true,
          handleCategoryValueChange,
          categoryValue,
          "I",
          isItemInfoVisible
        )}
      />
    </div>
  );
}
