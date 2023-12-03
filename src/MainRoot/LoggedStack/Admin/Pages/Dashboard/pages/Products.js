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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:8002/user/products");

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
  const [isItemInfoVisible, setIsItemInfoVisible] = useState(false);

  return (
    <div className="Admin-Products">
      <p>Products</p>
      <div className="Admin-Products-Container">
        {loading ? (
          <Spin size="large" />
        ) : (
          products?.map((item, index) => (
            <Product item={item} key={item._id + index} />
          ))
        )}
        <div
          onClick={() => {
            setIsItemInfoVisible(true);
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
        visible={isItemInfoVisible}
        onClose={() => {
          setCategoryValue(null);
          setIsItemInfoVisible(false);
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
          "",
          "",
          true,
          handleCategoryValueChange,
          categoryValue
        )}
      />
    </div>
  );
}
