import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import connectDb from "../../../utils/connectDb";

type Data = {
  name: string;
};

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

    user.cart.items.push({ productId: prodId, quantity: 1 });

    await user.save();

    res.status(201).json({ message: "Product added to cart!" });

    // check if product already exist in cart
    // if yes, update quantity
    // if not add product to cart with quantity 1
  }
}
