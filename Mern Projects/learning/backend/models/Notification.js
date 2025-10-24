import mongoose from "mongoose"
const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
        message: { type: String, required: true },
        readStatus: { type: Boolean, default: false },
    },
    { timestamps: true }
)
const Notification = mongoose.model("Order", notificationSchema)
export default Notification