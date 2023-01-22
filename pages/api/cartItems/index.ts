import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import connectDb from "../../../utils/connectDb";

interface ICartItem {
  productId: string;
  quantity: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDb();

    const prodId = req.body.prodId;

    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }

    // check if item exists in cart
    // index of 0 and above means alrady in cart
    // index of -1 or below 0 means not existing in cart array
    const cartProductIndex = user.cart.items.findIndex((item: ICartItem) => {
      return item.productId.toString() === prodId.toString();
    });
    console.log(cartProductIndex);

    let updatedCart;
    let newQuantity;
    const updatedCartItems = [...user.cart.items];

    // if not yet in cart
    if (cartProductIndex < 0) {
      newQuantity = 1;
      updatedCartItems.push({
        productId: prodId,
        quantity: newQuantity,
      });
    } else {
      newQuantity = user.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }

    updatedCart = {
      items: updatedCartItems,
    };

    user.cart = updatedCart;

    await user.save();

    res.status(201).json({ message: "Product added to cart!" });
  }
}
