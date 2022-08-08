import { model, Schema } from "mongoose";

export const Order = model(
  "Order",
  new Schema({
    name: String,
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customer: {
      name: String,
      address: String,
      phone: String,
    },
    consent: {
      support_club: { type: Boolean, default: true },
      show_support_amount: { type: Boolean, default: true },
    },
    payment: {
      method: String,
      amount: Number,
      transaction_id: String,
      status: String,
    },
  })
);

export default Order;
