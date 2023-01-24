import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import connectDb from "../../../utils/connectDb";

interface WishListItem {
  productId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  const productId = req.body.prodId;

  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({ message: "user not found" });
  }

  if (req.method === "POST") {
    const filteredWishList = user.wishlist.items.filter(
      (item: WishListItem) => item.productId.toString() === productId.toString()
    );

    // length > 0 --- already in included in wishlist
    if (filteredWishList.length > 0) {
      return res.status(500).json({ message: "Duplicate wishlist item" });
    }

    user.wishlist.items.push({ productId });

    await user.save();

    res.status(201).json({ message: "Product added to wishlist!" });
  }

  if (req.method === "PATCH") {
    const filteredWishList = user.wishlist.items.filter(
      (item: WishListItem) => item.productId.toString() !== productId.toString()
    );

    user.wishlist.items = filteredWishList;

    await user.save();

    res.status(201).json({ message: "Product removed from wishlist!" });
  }
}
