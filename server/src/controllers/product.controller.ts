import { StatusCodes } from "http-status-codes";
import { Product } from "../models/product.model";
import catchAsync from "../utils/catch_async";

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate("category");

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("category");

  if (!product) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Product not found",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;

  const newProduct = await Product.create(productData);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productData = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  }).populate("category");
  if (!updatedProduct) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Product not found",
      }),
    );
  }
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Product not found",
      }),
    );
  }
});

export const getProductsByCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;

  const products = await Product.find({ category: categoryId }).populate(
    "category",
  );

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No products found in this category",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const searchProducts = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(
      res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Query parameter is required",
      }),
    );
  }

  const products = await Product.find({
    name: { $regex: query, $options: "i" },
  }).populate("category");

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No products found matching the query",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getFeaturedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ isFeatured: true }).populate(
    "category",
  );

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No featured products found",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getLatestProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("category");

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No latest products found",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getTopRatedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .sort({ rating: -1 })
    .limit(10)
    .populate("category");

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No top-rated products found",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const filterProducts = catchAsync(async (req, res, next) => {
  const { category, priceRange, rating } = req.query;

  const filter: any = {};

  if (category) {
    filter.category = category;
  }

  if (priceRange) {
    // const [minPrice, maxPrice] = priceRange.split("-");
    // filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  }

  if (rating) {
    filter.rating = { $gte: Number(rating) };
  }

  const products = await Product.find(filter).populate("category");

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No products found matching the filters",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getProductReviews = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("reviews.user");

  if (!product) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Product not found",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      // reviews: product.reviews,
    },
  });
});
