// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  console.log(email);

  const user = await User.findOne({ email });

  const cartItems = user.cart.items;

  res.status(200).json({ cartItems });
}
