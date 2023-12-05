import logo from "../../../Images/logo.png";
import Popup from "./Reusable/Popup";
import { useState } from "react";
import { Product, ProductInfo } from "./Reusable/Product";

export default function Home({
  setCartItems,
  currentCatalogFilter,
  searchKeyWord,
}) {
  const shoppingGoods = [
    {
      id: 15232,
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
      id: 232432,
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
      id: 332423432,
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
      id: 432432,
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
      id: 5324324,
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
      id: 63243242,
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
      id: 7324324,
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
      id: 823432,
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
      id: 9234342,
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
      id: 1032432432,
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
      id: 1132423,
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
      id: 1232423432,
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
      id: 1343543543,
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
      id: 14634643,
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
      id: 152462532,
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
      id: 1643643634,
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

  const sortedGoods = shoppingGoods.slice().sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return b.isPinned - a.isPinned;
    } else if (a.reducedPricePercentage !== b.reducedPricePercentage) {
      return b.reducedPricePercentage - a.reducedPricePercentage;
    } else {
      return 0;
    }
  });

  // shopping cart
  const addItemToCart = (item) => {
    let cartArr = JSON.parse(localStorage.getItem("@cartArr")) || [];

    const existingItemIndex = cartArr.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.name === item.name
    );

    if (existingItemIndex !== -1) {
      cartArr[existingItemIndex].quantity =
        (cartArr[existingItemIndex].quantity || 1) + 1;
    } else {
      item.quantity = 1;
      cartArr.push(item);
    }

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

  //
  // Bad code on line 349. Fix it later.
  return (
    <div className="Home">
      <div className="shopping-goods-container">
        {sortedGoods.filter((item) => {
          const nameMatch =
            !searchKeyWord ||
            item.name.toLowerCase().includes(searchKeyWord.toLowerCase());

          const catalogFilterMatch =
            !currentCatalogFilter ||
            item.category === currentCatalogFilter ||
            (item.reducedPricePercentage > 0 &&
              currentCatalogFilter === "ფასდაკლებები");

          return nameMatch && catalogFilterMatch;
        }).length > 0 ? (
          sortedGoods
            .filter((item) => {
              const nameMatch =
                !searchKeyWord ||
                item.name.toLowerCase().includes(searchKeyWord.toLowerCase());

              const catalogFilterMatch =
                !currentCatalogFilter ||
                item.category === currentCatalogFilter ||
                (item.reducedPricePercentage > 0 &&
                  currentCatalogFilter === "ფასდაკლებები");

              return nameMatch && catalogFilterMatch;
            })
            .map((item, index) => {
              return (
                <Product
                  item={item}
                  key={item.id}
                  addItemToCart={addItemToCart}
                  showItemInfo={showItemInfo}
                  index={index}
                />
              );
            })
        ) : (
          <div
            style={{
              width: "100vw",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ textAlign: "center" }}>
              აღნიშნული კატეგორიის პროდუქტი მარაგში არაა.
            </p>
          </div>
        )}
      </div>
      <Popup
        visible={isItemInfoVisible}
        onClose={() => {
          closeItemInfo();
        }}
        modalClass="item-info-popup-component"
        children={ProductInfo(
          chosenItem?.id,
          chosenItem?.name,
          chosenItem?.imgSrc,
          chosenItem?.price,
          chosenItem?.reducedPricePercentage,
          chosenItem?.description,
          chosenItem?.code,
          chosenItem?.inStock,
          chosenItem?.ispinned,
          addItemToCart,
          chosenItem,
          false
        )}
      />
    </div>
  );
}
