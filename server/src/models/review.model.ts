import mongoose from "mongoose";

// --- Review Schema ---
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    imageUrls: {
      type: [String],
      default: [],
      maxlenght: 2,
    },
  },
  { timestamps: true },
);

// Add a compound unique index to prevent a user from reviewing the same product multiple times
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);
