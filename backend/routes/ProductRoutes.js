import express from "express";
import Product from "../models/product.js";
import { protect, admin } from "../middleware/authmiddleware.js";

// create router
const router = express.Router();

// save product
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    // save to the database
    const createProduct = await product.save();

    // responde
    res.status(201).json(createProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// update the product for this we need id of the product
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    //   /find the product
    const product = await Product.findById(req.params.id);
    // check if the product exists
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;

      // save the product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error updating product" });
  }
});

// delete a product from database
router.delete("/:id", protect, admin, async (req, res) => {
  // find the product
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // remove from the database
      await product.deleteOne();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(401).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting product" });
  }
});



// let go for best seller
// access free for user
router.get("/best-seller",async(req,res)=>{
  try {
    const bestSeller=await Product.findOne().sort({rating:-1});
    if (bestSeller) {
      res.json(bestSeller);
    }
    else{
      res.status(400).json({message:"No best-seller products!"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching best seller" });
    
  }
})


// create for new arrivals
router.get("/new-arrivals",async(req,res)=>{
  // fetch data from database
 try {
  const newArrivals=await Product.find().sort({createdAt:-1}).limit(8);
  res.json(newArrivals);
 } catch (error) {
  console.error(error);
  res.status(500).send({ message: "Error fetching new arrivals" });
  
 }
})


// lets go for similar products
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product =await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, //Exclude the current product id
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});




//  /api/products/:id to get product by id
//access will be public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});


// get all the product with query filter
router.get("/", async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      discountPrice,
      sortBy,
      category,
      brand,
      size,
      color,
      collection,
      material,
      gender,
      search,
    } = req.query;
    let query = {};

    // filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: color.split(",") };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$gte = Number(maxPrice);
      }
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // fetch product and apply sorting limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(req.query.limit) || 0);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

export default router;

// filter logic explain
// Ye API products fetch karne ke liye hai, jisme filters, sorting aur searching ka support diya gaya hai.
// 1. Pehle, req.query se sabhi filters ko extract kar rahe hain:
// 2. Ab query object create kiya ja raha hai jisme different conditions set ki jaayengi:
// 3. Agar collection "all" nahi hai, toh usi collection ke products dikhayenge.
// 4. Ye price ka minimum aur maximum range set karega.
// 5. Case-insensitive search ($options: "i") ka use kiya hai.
// 6. Agar user sorting select karega, toh usi ke basis pe sort hoga.
//    ---> priceAsc → Price low to high
//    ---> priceDesc → Price high to low
//    ---> popularity → Rating ke basis pe sort hoga
// 7.  Ye MongoDB se products fetch karega:
