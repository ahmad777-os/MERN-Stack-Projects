import mongoose from "mongoose"
const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        items: [
            {
                menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
                quantity: { type: Number, default: 1 },
            },
        ],
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "preparing", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema)
export default Order