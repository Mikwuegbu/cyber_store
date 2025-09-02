import mongoose from "mongoose";

// --- Order Schema ---
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // References the Product schema
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price_at_purchase: {
          type: Number,
          required: true,
        },
      },
    ],
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping_fee: {
      type: Number,
      required: true,
      min: 0,
    },
    estimated_tax: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    shipping_address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
