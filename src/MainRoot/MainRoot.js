import LoggedStack from "./LoggedStack/index";
import GuestStack from "./GuestStack";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faCheckSquare, faBars, faAngleDown, faFontAwesome } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faCheckSquare, faFontAwesome, faBars, faAngleDown);


export default function MainRoot() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <Router>
        <LoggedStack />
      </Router>
    );
  } else {
    return (
      <Router>
        <GuestStack />
      </Router>
    );
  }
}
