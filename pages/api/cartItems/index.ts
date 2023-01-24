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
  await connectDb();

  const prodId = req.body.prodId;

  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  if (req.method === "POST") {
    const addCartItemQuantity = req.body.quantity;

    // check if item exists in cart
    // index of 0 and above means alrady in cart
    // index of -1 or below 0 means not existing in cart array
    const cartProductIndex = user.cart.items.findIndex((item: ICartItem) => {
      return item.productId.toString() === prodId.toString();
    });
    // console.log(cartProductIndex);

    let updatedCart;
    let newQuantity;
    const updatedCartItems = [...user.cart.items];

    // if not yet in cart
    if (cartProductIndex < 0) {
      newQuantity = addCartItemQuantity;
      updatedCartItems.push({
        productId: prodId,
        quantity: newQuantity,
      });
    } else {
      newQuantity =
        user.cart.items[cartProductIndex].quantity + addCartItemQuantity;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }

    updatedCart = {
      items: updatedCartItems,
    };

    user.cart = updatedCart;

    await user.save();

    res.status(201).json({ message: "Product added to cart!" });
  }

  if (req.method === "PATCH") {
    console.log(user.cart.items);

    const filteredCart = user.cart.items.filter(
      (item: ICartItem) => item.productId.toString() !== prodId.toString()
    );

    user.cart.items = filteredCart;

    await user.save();

    res.status(201).json({ message: "Product removed cart!" });
  }
}
