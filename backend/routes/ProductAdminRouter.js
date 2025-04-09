import express from 'express';
import Product from '../models/product.js';
import { protect, admin } from '../middleware/authmiddleware.js';

const router = express.Router();

// get /api/admin/products
router.get('/', protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
        
    }
});


// post /api/admin/products


export default router;
