import { Router } from "express";
import {
  getBestsellers,
  getDiscountedProducts,
  getFeaturedProducts,
  getLatestArrivals,
  getProductsByCategory,
} from "../controllers/product.controller";

const router = Router();

router.get("/category/:categoryId", getProductsByCategory);
router.get("/latest-arrivals", getLatestArrivals);
router.get("/featured", getFeaturedProducts);
router.get("/best-sellers", getBestsellers);
router.get("/discount-products", getDiscountedProducts);

export default router;
