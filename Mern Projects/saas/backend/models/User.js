// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'client-worker', 'client-hirer'],
    default: 'client-hirer',
  },
  location: {
    type: String,
    validate: {
      validator: function (value) {
        return this.role === 'admin' || !!value;
      },
      message: 'Location is required for workers and hirers',
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;   // ✅ default export
