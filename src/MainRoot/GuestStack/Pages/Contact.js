import Popup from "./Reusable/Popup";

export default function Contact({ formVisible, setIsContactFormVisibleFunc }) {
  return (
    <Popup
      visible={formVisible}
      modalClass="Contact"
      children={<p>Contact</p>}
      onClose={setIsContactFormVisibleFunc}
    />
  );
}
