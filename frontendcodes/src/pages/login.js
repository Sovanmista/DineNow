// Login.js
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../ContextProvider";

function Login() {
  const navigate = useNavigate();
  const {
    login,
    setLogin,
    userLoginVerify,
    setuserLoginVerify,
    currentUser,
    setCurrentUser,
  } = useContext(MyContext);

  const gotocontents = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/verifyLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      const data = await response.json();

      if (data.message === "Succesful") {
        // setCurrentUser(data.userId);
        setuserLoginVerify(true);
        localStorage.setItem("jwttoken", data.token);

        console.log("status ", userLoginVerify);
        console.log("Login successful");
        navigate("/contents");
      } else {
        alert("Invalid credentials");
        navigate("/login");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // useEffect(() => {
  //   console.log(currentUser);
  //   if (currentUser) {
  //     localStorage.setItem("current", currentUser);
  //   }
  // }, [currentUser]);

  return (
    <div className="login">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={gotocontents}>
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={login.email}
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={login.password}
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          <button type="submit" className="buttons">
            Login
          </button>
        </form>
        <Link to="/register">Register now</Link>
      </div>
    </div>
  );
}

export default Login;
