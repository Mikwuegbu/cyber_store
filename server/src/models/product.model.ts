import mongoose from "mongoose";

// --- Product Schema ---
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Product names should ideally be unique
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    category: {
      type: String, // Could be a ref to a 'Category' schema for more structured categories
      required: true,
      enum: [
        "PHONES",
        "SMART_WATCHES",
        "CAMERAS",
        "HEADPHONES",
        "COMPUTERS",
        "GAMING",
      ],
    },
    specs: {
      storages: {
        type: [String],
        enum: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
      },
      colors: [
        {
          name: { type: String },
          hex: { type: String },
        },
      ],
      screen_size: { type: String },
      resolution: { type: String },
      refresh_rate: { type: String },
      screen_type: { type: String },
      battery: { type: String },
      main_camera: { type: String },
      front_camera: { type: String },
      connectivity: { type: String },
      number_of_cores: { type: Number },
      cpu: { type: String },
      //add more specs as needed
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    }, // optional keyword for search
    imageUrls: {
      type: [String],
      default: undefined,
      minlength: 2,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    discountUpTo50: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
