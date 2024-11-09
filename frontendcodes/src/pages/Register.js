import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../ContextProvider";

function Register() {
  const [loginmessage, setLoginmessage] = useState("");
  const { register, setRegister } = useContext(MyContext);
  const navigate = useNavigate();
  const alerty = () => {};
  //saves user login data to server
  const goToLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });

      if (!response.ok) {
        console.log("Registration failed");
      } else {
        console.log("Registration successful");
        const data = await response.json();

        if (data.message === "user created") {
          navigate("/login");
        } else {
          setLoginmessage(data.message);
        }
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className="register">
      <div className="login-card">
        <h2>Register</h2>
        <form onSubmit={goToLogin}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={register.name}
            onChange={(e) =>
              setRegister({ ...register, [e.target.name]: e.target.value })
            }
          />
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, [e.target.name]: e.target.value })
            }
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, [e.target.name]: e.target.value })
            }
          />
          <input
            className="login-input"
            type="address"
            name="address"
            placeholder="Enter your address"
            value={register.address}
            onChange={(e) =>
              setRegister({ ...register, [e.target.name]: e.target.value })
            }
          />
          <p>{loginmessage}</p>
          <button type="submit" className="buttons">
            Register
          </button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
