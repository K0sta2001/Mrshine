import { useState, useEffect } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route } from "react-router-dom";

export default function AdminStack() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [creditentialsWrong, setCreditantialsWrong] = useState(false);
  const [counterLoginSpam, setCounterLoginSpam] = useState(false);

  const login = (userName, password) => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/auth/loginadmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`არასწორი მონაცემები`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("@accessToken", JSON.stringify(data));
          window.location.pathName =
            process.env.REACT_APP_ADMIN_PATH + "/Dashboard";
          setIsTokenValid(true);
        }
      })
      .catch((error) => {
        setCreditantialsWrong(true);
        setCounterLoginSpam(true);
        setTimeout(() => {
          setCreditantialsWrong(false);
          setCounterLoginSpam(false);
        }, [3000]);
      });
  };

  useEffect(() => {
    const checkTokenValidity = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = localStorage.getItem("@accessToken")
            ? JSON.parse(localStorage.getItem("@accessToken"))?.token
            : "";

          if (!token) {
            reject("No token found. User is not authenticated.");
            window.location.pathName = process.env.REACT_APP_ADMIN_PATH;
            return;
          }
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/auth/checkadmintoken`,
            {
              method: "GET",
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (!response.ok) {
            reject("Token validation failed.");
            window.location.pathName = process.env.REACT_APP_ADMIN_PATH;
            return;
          }

          const data = await response.json();
          resolve(data.user);
        } catch (error) {
          reject(`Error checking token validity: ${error}`);
        }
      });
    };

    checkTokenValidity()
      .then((user) => {
        setIsTokenValid(true);
      })
      .catch((error) => {
        return;
      });
  }, []);

  if (localStorage.getItem("@accessToken") && isTokenValid) {
    return (
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route
          path="*"
          element={
            <Login
              login={login}
              loginButtonDisabled={counterLoginSpam}
              areCreditentialsWrong={creditentialsWrong}
            />
          }
        ></Route>
      </Routes>
    );
  }
}
