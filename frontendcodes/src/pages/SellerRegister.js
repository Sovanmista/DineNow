import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../ContextProvider';

function SellerRegister() {
  const { sellerregister, setsellerRegister } = useContext(MyContext);
  const navigate = useNavigate();

  const goToLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sellerregister),
      });

      if (!response.ok) {
        console.log("Registration failed");
      } else {
        console.log("Registration successful");
        navigate('/sellerlogin');
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className='register'>
      <div className="login-card">
        <h2>Seller Register</h2>
        <form onSubmit={goToLogin}>
          <input name='name' value={sellerregister.name} onChange={(e) => setsellerRegister({ ...sellerregister, [e.target.name]: e.target.value })} type="text" placeholder='Enter your name' />
          <input name='email' value={sellerregister.email} onChange={(e) => setsellerRegister({ ...sellerregister, [e.target.name]: e.target.value })} type="email" placeholder='Enter your email' />
          <input name='password' value={sellerregister.password} onChange={(e) => setsellerRegister({ ...sellerregister, [e.target.name]: e.target.value })} type="password" placeholder='Enter your password' />
          <button type='submit' className='buttons'>Register</button>
        </form>
        <Link to='/sellerlogin'>Login</Link>
      </div>
    </div>
  );
}

export default SellerRegister;
