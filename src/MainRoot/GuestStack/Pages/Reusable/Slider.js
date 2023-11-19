import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    autoplaySpeed: 6000,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div style={{ width: "90vw" }}>
      <Slider {...settings}>
        <div>
          <h3>Slide 1</h3>
        </div>
        <div>
          <h3>Slide 2</h3>
        </div>
        <div>
          <h3>Slide 3</h3>
        </div>
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
