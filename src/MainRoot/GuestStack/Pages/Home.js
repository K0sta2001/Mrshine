import logo from "../../../Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Home({ setCartItemsQuantity }) {
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
    },
    {
      id: 16,
      imgSrc: logo,
      name: "პროდუქტი 16",
      description: "ძალიან კარგი პროდუქტი",
      price: 110,
      reducedPricePercentage: 0,
      isPinned: true,
      category: "სანტექნიკა",
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
    setCartItemsQuantity(cartArr.length);
  };

  //

  return (
    <div className="Home">
      <div className="shopping-goods-container">
        {shoppingGoods.map((item, index) => {
          return (
            <div className="shopping-good" key={item.id + index} id={item.id}>
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
                  <p className="shopping-good-price">{item.price + "₾"}</p>
                </div>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  alt="add"
                  onClick={() => {
                    addItemToCart(item);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
