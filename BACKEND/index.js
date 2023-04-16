const express = require("express");
const cors = require("cors");
require("dotenv").config();

// local import
const { authenticate } = require("./middlewares/authenticate");
const { connect } = require("./configs/db");
const { ProductsRouter } = require("./routes/products.routes");
const { UserRouter } = require("./routes/users.routes");
const { CartRouter } = require("./routes/cart.routes");

// setup

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  try {
    res.send("Home Page");
  } catch (error) {
    res.send({ msg: "error in getting Home Page", error });
  }
});

app.use("/products", ProductsRouter);
app.use("/users", UserRouter);
app.use(authenticate);
app.use("/cart", CartRouter);

// connection
app.listen(3001, async () => {
  try {
    await connect;
    console.log("listening to DB...");
  } catch (error) {
    console.log("error!!!");
  }
  console.log("listening to port 3001...");
});
