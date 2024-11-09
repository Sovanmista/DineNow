import React, { useState, useEffect } from "react";
import Biriyani from "./unnamed.jpg";

function MyMenu() {
  const [menu, setMenu] = useState([]);
  // renders menu items at seller aspect
  const rendermenu = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/items");
      if (response.ok) {
        const data = await response.json();
        setMenu(data);
      } else {
        console.error("Something went wrong!");
      }
    } catch (err) {
      console.error("Something went wrong!");
    }
  };
  // deletes menu items at seller aspects
  const deleteitem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/items/delete/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        console.log("Deletion successful");

        setMenu((prevMenu) => prevMenu.filter((item) => item._id !== id));
      } else {
        console.error("Deletion failed");
      }
    } catch (err) {
      console.error("Something went wrong!");
    }
  };

  useEffect(() => {
    rendermenu();
  }, []);

  return (
    <div className="cardsStyle">
      {menu.length > 0 ? (
        menu.map((menu, index) => (
          <div className="contentcards" key={index}>
            <div>
              <img
                src={Biriyani}
                alt=""
                style={{ height: 170, borderRadius: 20 }}
                id="contentimg"
              />
              <h4 style={{ marginTop: 10 }}>{menu.name}</h4>
              <h5 style={{ marginTop: 10 }}>Price: {menu.price} rs</h5>
              <button
                style={{
                  backgroundColor: "red",
                  height: 40,
                  justifyContent: "center",
                  textAlign: "center",
                  border: "none",
                  borderRadius: 10,
                  color: "white",
                  cursor: "pointer",
                  width: 60,
                  marginTop: 20,
                }}
                onClick={() => deleteitem(menu._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2>No items</h2>
      )}
    </div>
  );
}

export default MyMenu;
