import type { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import User from "../../../models/User";
import { PopulatedItem } from "../../../types/interfaces";
import connectDb from "../../../utils/connectDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();
  const email = req.body.email;

  const products = await Product.find({});

  const user = await User.findOne({ email }).populate("cart.items.productId");

  if (!user) {
    return res.status(500).json({ message: "user not found" });
  }

  const cartItems = user.cart.items;

  // currently product is stored under product id, this map will move product under product.
  const transformedCartItems = cartItems.map((item: PopulatedItem) => {
    return {
      quantity: item.quantity,
      product: { ...item.productId._doc },
    };
  });

  try {
    const order = new Order({
      products: transformedCartItems,
      user: {
        email: email,
        userId: user._id,
      },
    });

    await order.save();

    user.cart = { items: [] };

    await user.save();

    res.status(201).json({ message: "Order confirmed!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}
