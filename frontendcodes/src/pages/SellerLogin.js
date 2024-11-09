import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../ContextProvider";

function SellerLogin() {
  const navigate = useNavigate();
  const [sellerLogin, setsellerLogin] = useState([]);

  const validateSeller = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/verifySellerLogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sellerLogin),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("seller", data.token);
        console.log("Login successful");
        navigate("/additems");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>Seller Login</h2>
        <form onSubmit={validateSeller}>
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={sellerLogin.email}
            onChange={(e) =>
              setsellerLogin({
                ...sellerLogin,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={sellerLogin.password}
            onChange={(e) =>
              setsellerLogin({
                ...sellerLogin,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button type="submit" className="buttons">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellerLogin;
