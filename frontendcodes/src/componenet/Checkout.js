import React, { useState } from "react";
import Checked from "./checked.png";
function Checkout(props) {
  const [state, setState] = useState(false);

  const sendorders = async () => {
    const token = localStorage.getItem("jwttoken");
    const data = { ordernames: props.ordernames, total: props.total };
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("orders sent successfully");
        setState(true);
      } else {
        console.error("orders did not send successfully");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const Modal = () => {
    return (
      <>
        <div className="modalwrap"></div>
        <div className="modalcontain">
          <h1 style={{ color: "white" }}>Order Placed !</h1>
          <img style={{ height: 300, marginTop: 50 }} src={Checked} alt="" />
        </div>
      </>
    );
  };
  return (
    <div
      id="checkout"
      style={{
        justifyContent: "center",
        textAlign: "center",
        marginTop: 200,
        backgroundColor: "greenyellow",
        height: 300,
        position: "fixed",
        width: 300,
        top: 0,
        borderRadius: 30,
      }}
    >
      <h3 style={{ marginTop: 80 }}>Total Price</h3>

      <h4 style={{ marginTop: 30 }}>{props.total} rs</h4>
      {state && <Modal />}
      <button
        onClick={sendorders}
        style={{
          marginTop: 20,
          height: 40,
          width: 100,
          borderRadius: 20,
          cursor: "pointer",
        }}
      >
        Checkout
      </button>
    </div>
  );
}

export default Checkout;
