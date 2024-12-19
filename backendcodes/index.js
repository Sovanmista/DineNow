const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes/rout");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://susovanmishra0800:<x2hZjeo9dIacA9xu>@cluster0.49vu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));;
app.use("/api", Router);
app.listen(3001, () => {
  console.log("listening on 3001");
});
