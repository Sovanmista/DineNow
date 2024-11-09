import React from 'react'
import {Link} from 'react-router-dom';
import Logo from './WhatsApp Image 2024-10-22 at 9.07.29 PM.jpeg'
import { useContext } from 'react';
import MyContext from '../ContextProvider';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout.png'
function Header() {
  const navigate = useNavigate();
  const {item, loggedin, setLoggedin}=useContext(MyContext);
  const logout=()=>{
    localStorage.removeItem("jwttoken");
  }
  
  return (
    
        <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="navbar-logo">
        <img src={Logo} alt=""  style={{height: 55, marginTop:10}}/ >
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contents" className="nav-links">
              Menu
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login/Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sellerlogin" className="nav-links">
              Seller Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/userOrders" className="nav-links">
              My Orders
            </Link>
          </li>
          <li className="nav-item">
            <img onClick={logout} style={{height:30, marginTop:17, cursor:"pointer", marginLeft:20}}src={Logout} alt="" />
             
            
          </li>
          
        </ul>
      </div>
    </nav>
      
   
  )
}

export default Header
