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
      processor: { type: String },
      ram: { type: String },
      storages: {
        type: [String],
        enum: ["128GB", "256GB", "512GB", "1TB"],
        default: undefined,
      },
      colors: [
        {
          name: { type: String },
          hex: { type: String },
        },
      ],
      display: { type: String },
      battery: { type: String },
      camera: { type: String },
      connectivity: { type: String },
      cpu: { type: String },
      gpu: { type: String },
      os: { type: String },
      features: { type: String },
      warranty: { type: String },
      lens: { type: String }, // add more as needed later
    },
    instoack: {
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
