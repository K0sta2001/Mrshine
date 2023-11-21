import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="Footer">
      <div>
        <a href="https://www.facebook.com/MrShine.ge" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="fb-logo" />
        </a>
        <a href="https://www.instagram.com/mrshine5525/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="insta-logo" />
        </a>
      </div>
      <p className="rights-p">All Rights Reserved ©</p>
      <p>mrshine.ge@gmail.com</p>
    </div>
  );
}
