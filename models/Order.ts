import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
  },
  createdOn: { type: Date, default: new Date() },
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
