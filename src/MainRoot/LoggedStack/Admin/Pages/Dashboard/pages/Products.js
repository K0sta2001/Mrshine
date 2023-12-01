import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Product from "../../../../../GuestStack/Pages/Reusable/Product";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [categoryValue, setCategoryValue] = useState(null);
  const handleCategoryValueChange = (value) => {
    setCategoryValue(value);
  };

  return (
    <div className="Admin-Products">
      <p>Products</p>
      <div className="Admin-Products-Container">
        {/* products go here */}
        <div
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
    </div>
  );
}
