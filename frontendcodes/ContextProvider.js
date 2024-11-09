import React, { createContext, useState } from "react";
import { BSON } from "bson";
const MyContext = createContext();
export const ContextProvider = ({ children }) => {
  const [loggedin, setLoggedin] = useState(false);
  const [item, setItem] = useState([]);

  const [userLoginVerify, setuserLoginVerify] = useState(false);
  const [sellerloginVerify, setsellerloginVerify] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [additems, setAddItems] = useState({
    name: "",
    price: "",
    tags: "",
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [sellerregister, setsellerRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [sellerLogin, setsellerLogin] = useState({
    email: "",
    password: "",
  });

  return (
    <MyContext.Provider
      value={{
        sellerloginVerify,
        setsellerloginVerify,
        currentUser,
        setCurrentUser,
        userLoginVerify,
        setuserLoginVerify,
        sellerLogin,
        setsellerLogin,
        register,
        setRegister,
        login,
        setLogin,
        item,
        setItem,
        loggedin,
        setLoggedin,
        sellerregister,
        setsellerRegister,
        additems,
        setAddItems,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyContext;
