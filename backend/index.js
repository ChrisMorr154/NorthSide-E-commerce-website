const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middleware/auth");
const app = express();
const port = 5000;
const product = require("./Routes/products");
const user = require("./Routes/users");
const order = require("./Routes/orders");
const customer = require("./Routes/customers");

mongoose
  .connect("mongodb+srv://nguyengiang1:123@cluster0.mkz0rdn.mongodb.net/")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use(cors());
app.use(isAuth);
app.use("/product", product);
app.use("/users", user);
app.use("/order", order);
app.use("/customers", customer);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
