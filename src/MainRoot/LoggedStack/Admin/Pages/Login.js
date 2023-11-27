import { useState } from "react";

// Static images
import companyLogo from "../../../../Images/logo.png";

export default function Login({ login }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="admin-login-container">
      <img src={companyLogo} alt="logo" />
      <form className="admin-login-form">
        <h1>შესვლა</h1>
        <div>
          <input
            placeholder="მომხმარებელი"
            id="user"
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            placeholder="პაროლი"
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="button" onClick={()=>login(userName, password)}>
            შესვლა
          </button>
        </div>
      </form>
    </div>
  );
}
