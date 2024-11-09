// Login.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../ContextProvider";

function Login() {
  const navigate = useNavigate();
  const {
    login,
    setLogin,
    userLoginVerify,
    setuserLoginVerify,
    setCurrentUser,
  } = useContext(MyContext);
  //verifies login info and shows menu
  // const getUserid=async()=>{
  //   try{
  //     const response=await
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
  const gotocontents = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/verifyLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      const data = await response.json();
      setCurrentUser(data.userId);
      if (data.message === "Succesful") {
        setuserLoginVerify("Yes");

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
