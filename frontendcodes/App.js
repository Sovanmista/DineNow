// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import DineNow from "./componenet/Header";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SellerLogin from "./pages/SellerLogin";
// import SellerRegister from './pages/SellerRegister';
import Cart from "./componenet/Cart";
import Contents from "./pages/Contents";
import { useContext } from "react";
// import Footer from './componenet/Footer';
// import Creator from './componenet/Creator';
import MyContext from "./ContextProvider";
import AddItems from "./componenet/AddItems";
import MyMenu from "./pages/MyMenu";
import MyOrders from "./pages/MyOrders";
import CurrentOrders from "./componenet/CurrentOrders";
import Orders from "./componenet/Orders";

function App() {
  const { userLoginVerify } = useContext(MyContext);
  return (
    <BrowserRouter>
      <div className="App">
        <DineNow />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sellerlogin" element={<SellerLogin />} />
          {/* <Route path='/sellerregister' element={<SellerRegister/>}/> */}
          <Route path="/cart"  element={localStorage.getItem("jwttoken")? <Cart /> : <Navigate to="/login" />}/>
          <Route path="/additems" element={<AddItems />} />
          <Route path="/contents" element={localStorage.getItem("jwttoken")?<Contents />: <Navigate to="/login"/>} />
          <Route path="/MyMenu" element={<MyMenu />} />
          <Route path="/MyOrders" element={<MyOrders />} />
          <Route path="/orders" element={<CurrentOrders />} />
          <Route path="/userOrders" element={<Orders/>}/>
        </Routes>
        {/* <Footer /> */}
        {/* <Creator/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
