import logo from "../../../../../../Images/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Headers() {
  const [highlightedAnchorId, setHighlightedAnchorId] = useState(1);

  // ignore this. Static array
  useEffect(() => {
    setHighlightedAnchorId((prevHighlightedAnchorId) => {
      const matchingNavItem = adminNavPaths.find(
        (navItem) => navItem.to === window.location.pathname
      );
      return matchingNavItem ? matchingNavItem.id : prevHighlightedAnchorId;
    });
    // eslint-disable-next-line
  }, []);

  const adminNavPaths = [
    {
      id: 1,
      to: process.env.REACT_APP_ADMIN_PATH,
      placeholder: "ყველა პროდუქტი",
    },
    {
      id: 2,
      to: process.env.REACT_APP_ADMIN_PATH + "/CRUD",
      placeholder: "CRUD",
    },
    {
      id: 3,
      to: process.env.REACT_APP_ADMIN_PATH + "/Users",
      placeholder: "მომხმარებლები",
    },
  ];

  // handle mobile res
  const [isDivVisible, setDivVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavToggle = () => {
    if (windowWidth <= 860) {
      setDivVisible(!isDivVisible);
    }
  };

  return (
    <div className="Admin-Headers">
      <img src={logo} alt="logo" onClick={handleNavToggle} />
      <div
        style={{
          display: isDivVisible ? "flex" : "none",
          flexDirection: windowWidth <= 860 ? "column" : "row",
        }}
      >
        {adminNavPaths.map((anchor) => (
          <Link
            to={anchor.to}
            id={anchor.id}
            key={anchor.id}
            style={{
              opacity: parseInt(highlightedAnchorId) === anchor.id ? 1 : 0.7,
            }}
            onClick={(e) => {
              setHighlightedAnchorId(e.target.id);
            }}
          >
            {anchor.placeholder}
          </Link>
        ))}
      </div>
      <p>ზაზა ქიქავა</p>
    </div>
  );
}
