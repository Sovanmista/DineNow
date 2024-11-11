import React, { useContext, useEffect, useState } from "react";
import Biriyani from "./unnamed.jpg";
// import MyContext from '../ContextProvider';
import MyContext from "../ContextProvider";
import { BSON } from "bson";
// import { useContext } from 'react';
import Search from "./search.png";
import CartIcon from "./cart.png";
import { Link, redirect } from "react-router-dom";
function Contents() {
  const [currentCart, setCurrentCart] = useState([]);
  const [fetchedItems, setFetchedItems] = useState([]);
  const [search, setSearch] = useState("");
  const { currentUser } = useContext(MyContext);

  // saves data to cart collection in server
  const savetocart = async (name, price) => {
    const data = { name, price };
    const token = localStorage.getItem("jwttoken");

    try {
      const response = await fetch(
        `http://localhost:3001/api/users/cartitems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        console.error("Something went wrong");
      } else {
        console.log("Successful");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // fetches data from items collection
  const itemset = async () => {
    const token= localStorage.getItem("jwttoken");
    try {
      
      const response = await fetch("http://localhost:3001/api/items", {
        method: "GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFetchedItems(data);
      } else {
        console.error("Something went wrong");
      }
    
    
    } catch (err) {
      console.log(err);
    }
  };
  // handles search functionality in backend
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const searchedItems = fetchedItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    itemset();
  }, []);
  return (
    <>
      <form style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          id="searchbar"
          style={{ marginRight: 10 }}
        />
        <Link to="/cart">
          <img
            style={{ height: 60, cursor: "pointer", marginRight: 20 }}
            src={CartIcon}
            alt="Cart"
          />
        </Link>
      </form>

      <div className="cardsStyle">
        {searchedItems.length > 0 ? (
          searchedItems.map((item, index) => {
            return (
              <div className="contentcards">
                <div key={index}>
                  <img
                    src={Biriyani}
                    alt=""
                    style={{ height: 170, borderRadius: 20 }}
                    id="contentimg"
                  />
                  <h4 style={{ marginTop: 20 }}>{item.name}</h4>
                  <h5 style={{ marginTop: 20 }}>Price: {item.price} rs</h5>
                  <button
                    style={{
                      backgroundColor: "greenyellow",
                      height: 40,
                      justifyContent: "center",
                      textAlign: "center",
                      border: "none",
                      borderRadius: 10,
                      color: "black",
                      cursor: "pointer",
                      marginTop: 20,
                      padding:10
                    }}
                    id="itembtn"
                    onClick={() => savetocart(item.name, item.price)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No items</h2>
        )}
      </div>
    </>
  );
}

export default Contents;
