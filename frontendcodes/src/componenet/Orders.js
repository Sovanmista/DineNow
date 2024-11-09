import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const cancelorder=async(id)=>{
    const token=localStorage.getItem("jwttoken");
    try{
        const response=await fetch(`http://localhost:3001/api/userorders/${id}`, {
            method:'DELETE',
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.ok){
            // setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));

            console.log('Success');
        }
        else{
            console.log('Error');
        }
    }
    catch (err) {
        console.error("Failed to cancel order");
    }
  }
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("jwttoken");
      try {
        const response = await fetch("http://localhost:3001/api/orders/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [cancelorder]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        id="secondsec"
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "20px",
          margin: "auto",
        }}
      >
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="cartcard"
              key={index}
              style={{
                marginBottom: "20px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4 style={{ marginBottom: 20 }}>
                Orders: {order.orders.join(", ")}
              </h4>

              <h2>Bill: {order.payment}rs</h2>
              {!order.cancel?(
              <button
              onClick={()=>cancelorder(order._id)}
                style={{
                  marginTop: 20,
                  height: 40,
                  width: 70,
                  borderRadius: 15,
                  cursor: "pointer",
                  backgroundColor: "red",
                  border: "none",
                 
                  color: "white",
                }}
              >
                Cancel
              </button>) : (<h4 style={{marginTop:20}}>order cancelled</h4>)
                }
            </div>
          ))
        ) : (
          <h2>No orders found.</h2>
        )}
      </div>
    </div>
  );
}

export default Orders;
