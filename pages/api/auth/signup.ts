import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import connectDb from "../../../utils/connectDb";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, mobile, password, confirmPass } = req.body;

  console.log({ name, email, mobile, password, confirmPass });

  const loweredEmail = email.toLowerCase();

  await connectDb();

  const foundUser = await User.findOne({ email: loweredEmail }).lean();

  if (foundUser) {
    return res
      .status(422)
      .json({ success: false, message: "Email already exists." });
  }

  const passwordsMatch = password === confirmPass;

  if (!passwordsMatch) {
    return res
      .status(422)
      .json({ success: false, message: "Passwords should match." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email: loweredEmail,
    mobile,
    password: hashedPassword,
    cart: { items: [] },
    wishlist: { items: [] },
  });

  await newUser.save();

  res.json({ success: true, message: "User successfully signed up" });
}
