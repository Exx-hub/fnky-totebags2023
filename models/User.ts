import { Schema, model, models } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
  cart: any[];
  wishlist: any[];
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number },
      },
    ],
  },
  wishlist: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number },
      },
    ],
  },
});

const User = models.User || model("User", userSchema);

export default User;
