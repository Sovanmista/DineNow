const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Seller = require("../model/seller");
const Food = require("../model/food");
const Orders = require("../model/orders");
const jwt = require("jsonwebtoken");
const orderModel = require("../model/orders");
const secretK = "Susovan123";
// handles all functionalities of the cart
router.post("/users/cartitems", async (req, res) => {
  const { name, price } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretK);
    if (decoded) {
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        const cartItem = { name, price };
        user.cart.push(cartItem);
        await user.save();
        return res
          .status(200)
          .json({ message: "Item added to cart successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error("Error while adding item to cart:", err);
    return res.status(500).json({ message: "Server error" });
  }
});
router.get("/users/cartitems", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decode = jwt.verify(token, secretK);
    if (!decode) {
      res.json("token not verified/ session expired");
    }
    const email = decode.email;

    const user = await User.findOne({ email: email });
    if (user) {
      console.log(user.cart);
      res.json(user.cart);
    } else {
      console.log("error occured");
    }
  } catch (err) {
    console.log(err);
  }
});
// add items according to the seler
router.post("/items", async (req, res) => {
  try {
    const newFood = new Food(req.body);
    const saveFood = await newFood.save();
    res.json(saveFood);
  } catch (err) {
    console.log(err);
  }
});
// fetches the data on contents page
router.get("/items", async (req, res) => {
  try {
    const food = await Food.find();
    res.json(food);
  } catch (err) {
    console.log(err);
  }
});
//deletes cart items
router.post("/cartitems/delete/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decode = jwt.verify(token, secretK);
    if (decode) {
      const { id } = req.params;
      const user = await User.findOne({ email: decode.email });
      if (user) {
        user.cart = user.cart.filter((item) => item._id.toString() !== id);
        await user.save();
        res.json({ message: "success" });
      } else {
        res.json({ message: "error" });
      }
    } else {
      res.status(404).json({ message: "token not verified" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// deletes menu items according to the seller
router.post("/items/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteitem = await Food.findByIdAndDelete(id);
    if (deleteitem) {
      res.status(200).json({ message: "Successful delete" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// used to verify the existence of th euser
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});
// creates new user
router.post("/user", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();

      res.json(saveUser);
    } else {
      return res.json({ message: "user already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/seller", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    console.log(err);
  }
});
router.post("/seller", async (req, res) => {
  try {
    const newSeller = await new Seller(req.body);
    const saveSeller = newSeller.save();
    res.json(saveSeller);
  } catch (err) {
    console.log(err);
  }
});

// verifies user credentials
router.post("/verifyLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        const payload = {
          email: user.email,
        };
        const token = jwt.sign(payload, secretK, { expiresIn: "5h" });
        res.status(200).json({ message: "Succesful", token: token });
      } else {
        res.json({ message: "failed" });
      }
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//tried to initiate search functionality with backend
router.get("/items/find/:q", async (req, res) => {
  const { q } = req.params;
  try {
    const items = await Food.find({ tags: q });
    res.json(items);
  } catch (err) {
    console.error("Server error:", err);
  }
});

// verifies seller login
router.post("/verifySellerLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (seller) {
      if (seller.password === password) {
        const payload={
            email: seller.email,
            password: seller.password
        }
        const token= jwt.sign(payload,secretK, {expiresIn: "5h"});
        res.status(200).json({ message: "Succesful", token: token});
      } else {
        res.json({ message: "failed" });
      }
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/orders", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { ordernames, total } = req.body;
  try {
    const decode = jwt.verify(token, secretK);
    if (decode) {
      const user = await User.findOne({ email: decode.email });
      if (user) {
        const newOrders = new Orders({
          name: user.name,
          email: user.email,
          address: user.address,
          orders: ordernames,
          payment: total,
          cancel: false,
          complete: false
        });
        const saveOrders = await newOrders.save();
        res.json(saveOrders);
      } else {
        res.json("something went wrong");
      }
    } else {
      console.log("Something went wrong");
    }
  } catch (err) {
    console.error("Server error:", err);
  }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Orders.find();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/orders/my', async(req, res) => {
    const token=req.headers.authorization?.split(" ")[1];
    try{
        const decode= jwt.verify(token, secretK);
        if (decode){
            const userOrders=await Orders.find({email: decode.email});
            res.json(userOrders);
        }
    }
    catch (err) {
        console.error("Server error:", err);
    }
})


router.delete('/userorders/:id', async(req, res) => {
    const token =req.headers.authorization?.split(" ")[1];
    const {id}=req.params;
    try{
        const decode= jwt.verify(token, secretK);
        if (decode){
            const deleteitem= await Orders.findById(id);
            if(deleteitem){
                deleteitem.cancel = true;
                await deleteitem.save(); 
                console.log("item deleted successfully");

            }
            else{
                console.log("cant delete item");

            }
        }
        else{
            console.log("cant delete item");

        }
    }
    catch (err) {
        console.error("Server error:", err);
    }
})



router.post('/orders/complete/:id', async (req, res) => {
    const token= req.headers.authorization?.split(" ")[1];
    const {id}=req.params;
    try{
        const decode=jwt.verify(token, secretK);
        if(decode){
            const completeitem=await Orders.findById(id);
            if(completeitem){
                completeitem.complete=true;
                await completeitem.save();
                console.log("item delivered successfully");
            }
            else{
                console.error("erroe");
            }
        }
        else{
            console.error("error");
        }

    }
    catch (err) {
        console.error("Server error:", err);
    }
}
)
module.exports = router;
