const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes/rout");
const app = express();
const port=process.env.PORT||3001
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://susovanmishra0800:_aYDiW98kiah64w@cluster0.49vu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use("/api", Router);

app.listen(port, () => {
  console.log("listening on 3001");
});
