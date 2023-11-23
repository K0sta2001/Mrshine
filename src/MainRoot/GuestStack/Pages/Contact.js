import Popup from "./Reusable/Popup";
import { useState, useEffect, useRef } from "react";

export default function Contact({ formVisible, setIsContactFormVisibleFunc }) {
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pNumber, setPNumber] = useState(null);
  const [text, setText] = useState(null);
  const [sendMessageActive, setSendMessageActive] = useState("deactive");

  const formInputs = [
    {
      placeholder: "სახელი ან კომპანიის სახელი",
      onChangeFunc: (value) => {
        setName(value);
      },
    },
    {
      placeholder: "გვარი ან კომპანიის სახელი",
      onChangeFunc: (value) => {
        setLastName(value);
      },
    },
    {
      placeholder: "საკონტაქტო ნომერი",
      onChangeFunc: (value) => {
        setPNumber(value);
      },
    },
    {
      id: "textarea",
      placeholder: "დატოვეთ შეტყობინება",
      onChangeFunc: (value) => {
        setText(value);
      },
    },
  ];

  const [highlights, setHighlights] = useState(formInputs.map(() => false));

  const handleFocus = (index) => {
    setHighlights((prevHighlights) => {
      const newHighlights = [...prevHighlights];
      newHighlights[index] = !newHighlights[index];
      return newHighlights;
    });
  };

  useEffect(() => {
    const newSendMessageActive =
      name && lastName && pNumber && text ? "active" : "deactive";

    if (newSendMessageActive !== sendMessageActive) {
      setSendMessageActive(newSendMessageActive);
    }
  }, [name, lastName, pNumber, text, sendMessageActive]);

  // handling form submition
  const [successVisibility, setSuccessVisibility] = useState(false);
  const successPopupComponent = (
    <Popup
      visible={successVisibility}
      onClose={() => {
        setSuccessVisibility(false);
        window.location.reload();
      }}
      children={
        <p style={{ marginTop: "10px" }}>
          შეტყობინება გაგზავნილია. მალე გიპასუხებთ.
        </p>
      }
    />
  );

  const warning = useRef(null);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const handleSend = (className) => {
    if (className === "active") {
      setSuccessVisibility(true);
    } else {
      console.log("please fill in all the forms");
      warning.current.style.opacity = "1";
      warning.current.style.animation = "Fade 3s reverse forwards";
      setSendButtonDisabled(true);
      setTimeout(() => {
        warning.current.style.animation = "";
        warning.current.style.opacity = "0";
        setSendButtonDisabled(false);
      }, 3000);
    }
  };

  return (
    <Popup
      visible={formVisible}
      modalClass="Contact"
      children={
        <div className="Contact-Component">
          <p>მოგვწერეთ</p>
          <form>
            {formInputs.map((input, index) => {
              if (input.id) {
                return (
                  <textarea
                    placeholder={input.placeholder}
                    key={index}
                    onChange={(e) => input.onChangeFunc(e.target.value)}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleFocus(index)}
                    style={{ borderColor: highlights[index] ? "#3d80eb" : "" }}
                  ></textarea>
                );
              } else {
                return (
                  <input
                    placeholder={input.placeholder}
                    key={index}
                    onChange={(e) => input.onChangeFunc(e.target.value)}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleFocus(index)}
                    style={{ borderColor: highlights[index] ? "#3d80eb" : "" }}
                  ></input>
                );
              }
            })}
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p
                ref={warning}
                style={{
                  opacity: "0",
                  fontWeight: "400",
                  fontSize: "12px",
                  color: "rgb(200, 70, 20",
                }}
              >
                გთხოვთ შეავსოთ ველები
              </p>
              <button
                type="button"
                disabled={sendButtonDisabled}
                className={sendMessageActive}
                onClick={(e) => handleSend(e.target.className)}
              >
                გაგზავნა
              </button>
            </div>
          </form>
          {successPopupComponent}
        </div>
      }
      onClose={setIsContactFormVisibleFunc}
    />
  );
}
