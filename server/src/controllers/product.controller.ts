import { StatusCodes } from "http-status-codes";
import { Product } from "../models/product.model";
import catchAsync from "../utils/catch_async";

// Get products by category
export const getProductsByCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const totalItems = await Product.countDocuments({
    category: categoryId.toUpperCase(),
  });
  const totalPages = Math.ceil(totalItems / limit);

  if (totalItems === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No products found in this category.",
      }),
    );
  }
  const products = await Product.find({
    category: categoryId.toUpperCase(),
  })
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({
    results: totalItems,
    numberOfPages: totalPages,
    page,
    products,
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

// get featured products
export const getFeaturedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(8);

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
    products,
  });
});

// get latest products
export const getLatestArrivals = catchAsync(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(8);

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "No latest products found",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    products,
  });
});

// get products with discount up to 50%
export const getDiscountedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ discountUpTo50: true })
    .sort({ createdAt: -1 })
    .limit(8);

  if (products.length === 0) {
    return next(
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "No discounted products found",
      }),
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: products.length,
    products,
  });
});

// get bestsellers
//TODO: Implement the logic to fetch bestsellers
export const getBestsellers = catchAsync(async (req, res, next) => {
  // const products = await Product.find()
  //   .sort({ rating: -1 })
  //   .limit(10)
  //   .populate("category");

  // if (products.length === 0) {
  //   return next(
  //     res.status(StatusCodes.NOT_FOUND).json({
  //       status: "error",
  //       message: "No top-rated products found",
  //     }),
  //   );
  // }

  res.status(StatusCodes.OK).json({
    status: "success",
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
