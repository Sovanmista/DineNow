import React, { useContext, useState } from 'react';
import MyContext from '../ContextProvider';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function AddItems() {
  const navigate=useNavigate();
  const { additems, setAddItems } = useContext(MyContext);
  const [message, setMessage] = useState('');
 
  const addTodatabase = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/items", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(additems)
      });

      if (response.ok) {
        setMessage('Item added successfully!');
        setAddItems({ name: '', price: '' }); 
      } else {
        setMessage('Failed to add item.');
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred while adding the item.');
    }
  };

  return (
    <div className='additem'>
      <div className="login-card">
        <h2>Add Menu</h2>
        <form onSubmit={addTodatabase}> 
          <input 
            name="name" 
            value={additems.name}  
            onChange={(e) => setAddItems({ ...additems, [e.target.name]: e.target.value })} 
            style={{ marginTop: 20, borderRadius: 3, height: 30, width: 250, cursor: "pointer" }} 
            placeholder="Enter food name"
            type="text"
            className='addcontent' 
          />
          <input 
            name="price" 
            value={additems.price}  
            onChange={(e) => setAddItems({ ...additems, [e.target.name]: e.target.value })} 
            style={{ marginTop: 20, borderRadius: 3, height: 30, width: 250, cursor: "pointer" }} 
            type="text" 
            placeholder='Enter price'  
            className='addcontent' 
          /> 
           {/* <input 
            name="tags" 
            value={additems.tags}  
            onChange={(e) => setAddItems({ ...additems, [e.target.name]: e.target.value })} 
            style={{ marginTop: 20, borderRadius: 3, height: 30, width: 250, cursor: "pointer" }} 
            type="text" 
            placeholder='Enter tag'  
            className='addcontent' 
          />  */}
          <br />
          <button 
            style={{ marginTop: 20,marginBottom:20, width: 90, height: 30, cursor: "pointer", borderRadius: 5 ,backgroundColor:'yellow'}} 
            type='submit'
          >
            Add
          </button>
            <br />
          {/* <button onClick={gotoorders}  style={{marginBottom:20, width: 90, height: 50, cursor: "pointer", borderRadius: 5, backgroundColor:'yellow' }} >
              Current Orders
          </button> */}
          <Link to="/MyOrders"> My Orders</Link>
          <br />
          <Link to='/MyMenu'>Add or Remove items from Menu</Link>
          <br />
          {message && <p style={{marginTop:30}}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddItems;
