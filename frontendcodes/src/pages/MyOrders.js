import React, { useEffect, useState } from 'react';

function MyOrders() {
  const [data, setData] = useState([]);
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
  const ordercomplete=async(id)=>{
    const token= localStorage.getItem('jwttoken');
    try{
      const response= await fetch(`http://localhost:3001/api/orders/complete/${id}`,{
        method: 'POST',
        headers: {"Authorization": `Bearer ${token}`}
      })
      if(response.ok){
        
        console.log('Success');
      }
      else{
        console.log('Error');
      }
    }
    catch (err) {
      console.error("Failed to complete order");
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/orders');
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error('Error fetching data');
        }
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };

    fetchData();
  }, [cancelorder]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div id="secondsec" style={{ display:"flex", flexWrap:"wrap", padding: "20px", margin:"auto" }}>
        {data.length > 0 ? (
          data.map((order, index) => (
            <div
              className="cartcard"
              key={index}
              style={{
                marginBottom: "20px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4 style={{marginBottom:20}}>Customer Name: {order.name}</h4>
              <h4 style={{marginBottom:20}}>Customer Email: {order.email}</h4>
              <h4 style={{marginBottom:20}}>Customer Address: {order.address}</h4>
              <h4 style={{marginBottom:20}}>Orders: {order.orders.join(', ')}</h4>
              <h2>Bill: {order.payment}rs</h2>
              {!order.cancel ? (
                order.complete ? (
                  <h4 style={{ color: "green" }}>Item Delivered</h4>
                ) : (
                  <div>
                    <button
                      onClick={() => ordercomplete(order._id)}
                      style={{
                        marginTop: 20,
                        height: 40,
                        width: 100,
                        borderRadius: 15,
                        cursor: "pointer",
                        backgroundColor: "greenyellow",
                        border: "none",
                      }}
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => cancelorder(order._id)}
                      style={{
                        marginTop: 20,
                        height: 40,
                        width: 100,
                        borderRadius: 15,
                        cursor: "pointer",
                        backgroundColor: "red",
                        border: "none",
                        marginLeft: 20,
                        color: "white",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )
              ) : (
                <h4 style={{ color: "red" }}>Order Cancelled</h4>
              )}
            </div>
          ))
        ) : (
          <h2>No orders found.</h2>
        )}
      </div>
    </div>
  );
}

export default MyOrders;

