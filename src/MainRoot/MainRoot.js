import LoggedStack from "./LoggedStack/index";
import GuestStack from "./GuestStack";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faCheckSquare,
  faBars,
  faAngleDown,
  faFontAwesome,
} from "@fortawesome/free-solid-svg-icons";
import AdminStack from "./LoggedStack/Admin/index";

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
        <Routes>
          <Route path="/*" element={<GuestStack />}></Route>
          <Route
            path={process.env.REACT_APP_ADMIN_PATH + "/*"}
            element={<AdminStack />}
          ></Route>
        </Routes>
      </Router>
    );
  }
}
