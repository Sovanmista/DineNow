const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes/rout");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://susovanmishra0800:<pJdPPyZMMYRhfLnd>@cluster0.49vu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
app.use("/api", Router);
app.listen(3001, () => {
  console.log("listening on 3001");
});
