const { ProductsModel } = require("../models/products.schema");
const { UserModel } = require("../models/user.schema");

const ProductsRouter = require("express").Router();

ProductsRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    if (query["min"] && query["max"]) {
      const renged = await ProductsModel.find({
        $and: [
          { price: { $gte: query["min"] } },
          { price: { $lte: query["max"] } },
        ],
        ...query,
      }).sort({ price: 1 });
      res.send(renged);
    } else if (query["sort"]) {
      const sorted = await ProductsModel.find(query).sort(
        query["sort"].replace(",", " ")
      );
      res.send(sorted);
    } else {
      const filtered = await ProductsModel.find(query);
      res.send(filtered);
    }
  } catch (error) {
    res.send({ msg: "can't get all products", error });
  }
});

ProductsRouter.get("/search", async (req, res) => {
  const query = req.query;
  try {
    if (query["q"].length) {
      const searched = await ProductsModel.find({
        $or: [
          {
            brand: { $regex: `${query["q"]}`, $options: "i" },
          },
          {
            name: { $regex: `${query["q"]}`, $options: "i" },
          },
          {
            category: { $regex: `${query["q"]}`, $options: "i" },
          },
        ],
      }).limit(+query["limit"]);
      res.send(searched);
    } else {
      res.send({
        msg: "please type to search by name, brand or category",
        error: "q is not passed",
      });
    }
  } catch (error) {
    res.send({ msg: `ERROR in searching products`, error });
  }
});

ProductsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductsModel.findById({ _id: id });
    res.send(product);
  } catch (error) {
    res.send({ msg: `can't get product of id ${id}`, error });
  }
});

module.exports = { ProductsRouter };
