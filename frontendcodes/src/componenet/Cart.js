import React from "react";
import Checkout from "./Checkout";
import { useEffect, useState, useContext } from "react";

import MyContext from "../ContextProvider";
function Cart() {
  const [localCart, setlocalCart] = useState([]);
  const { userLoggedin, setUserLoggedin, currentUser } = useContext(MyContext);
  const [customer, setCustomer] = useState("");
  // const [orderdetails, setorderDetails]=useState({
  //     name: "",
  //     email:"",
  //     address
  // });

  const [ordernames, setOrdernames] = useState([]);
  const loadCart = async () => {
    const token = localStorage.getItem("jwttoken");
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/cartitems`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setlocalCart(data);
        console.log(localCart);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeitem = async (id) => {
    const token = localStorage.getItem("jwttoken");
    try {
      const response = await fetch(
        `http://localhost:3001/api/cartitems/delete/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setlocalCart((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const names = localCart.map((item) => item.name);
    setOrdernames(names);
  }, [localCart]);

  // useEffect(() => {
  //     const currentcustomer = localStorage.getItem("current");
  //     setCustomer(currentcustomer);
  //   }, []);

  useEffect(() => {
    loadCart();
  }, []);
  const totalPrice = localCart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div id="secondsec" style={{ flex: "2", padding: "20px" }}>
        {localCart.length > 0 ? (
          localCart.map((cartItem, index) => (
            <div
              className="cartcard"
              key={index}
              style={{
                marginBottom: "20px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2>{cartItem.name}</h2>
              <p style={{ marginTop: 20 }}>Price: {cartItem.price} rs</p>
              <button
                onClick={() => removeitem(cartItem._id)}
                style={{
                  marginTop: 20,
                  height: 40,
                  width: 70,
                  borderRadius: 15,
                  cursor: "pointer",
                  backgroundColor: "greenyellow",
                  border: "none",
                }}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <h2>Your cart is empty.</h2>
        )}
      </div>

      <div id="firstsec" style={{ flex: "1" }}>
        {/* {currentUser} */}
        <Checkout total={totalPrice} ordernames={ordernames} />
      </div>
    </div>
  );
}

export default Cart;
