import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: String,
  sku: String,
  bagImage: String,
  patternImage: String,
  price: String,
  description: String,
});

const Product = models.Product || model("Product", productSchema);

export default Product;
