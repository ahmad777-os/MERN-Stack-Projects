import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true }, // in USD or your choice
    currency: { type: String, default: "usd" },

    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "delivered", "completed", "cancelled"],
      default: "pending",
    },

    // Payment fields
    paymentMethod: { type: String, enum: ["card"], default: "card" },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed", "refunded"],
      default: "unpaid",
    },
    transactionId: { type: String, default: null },      // Stripe payment_intent id
    checkoutSessionId: { type: String, default: null },  // Stripe session id
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
