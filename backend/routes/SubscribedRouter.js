import express from 'express';
import Subscriber from '../models/Subscribe.js';

const router = express.Router();

// @route/POST /api/subscribed
// @desc handle newslaetter subscription
router.post("/subscriber", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // check if email already exists
        let subscriber = await Subscriber.findOne({email});

        if(subscriber){
            return res.status(400).json({message:'Email already subscribed'});
        }

        // create new subscriber
        subscriber = new Subscriber({email});
        await subscriber.save();

        res.status(201).json({messaage:"Subscribed successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
});

export default router;