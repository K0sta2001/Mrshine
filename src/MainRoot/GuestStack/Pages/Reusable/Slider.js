import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cover from "../../../../Images/cover.png";

const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    afterChange: (current) => setCurrentSlide(current),
  };

  const slidesArr = [
    cover,
    cover,
    cover,
    cover,
    cover,
    cover,
    cover,
    cover,
    cover,
    cover,
  ];

  return (
    <div style={{ width: "85vw", transform: "translateX(8vw)" }}>
      <Slider {...settings}>
        {slidesArr.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={item}
                alt={"slide" + index}
                style={{ width: "100%", maxHeight: "280px" }}
                loading="lazy"
              ></img>
            </div>
          );
        })}
      </Slider>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {Array.from({
          length: settings.dots === true ? settings.slidesToShow : 0,
        }).map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              display: "none",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              background: currentSlide === index ? "#333" : "#ccc",
              margin: "0 5px",
              cursor: "pointer",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
