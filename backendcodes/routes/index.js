const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes/rout");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/food");
app.use("/api", Router);
app.listen(3001, () => {
  console.log("listening on 3001");
});
