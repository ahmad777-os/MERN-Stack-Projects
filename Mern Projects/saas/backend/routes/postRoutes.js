// routes/postRoutes.js
import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();
// Create a post
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subcategory,
      location,
      price,
      deliveryTime,
      extras,
      experience,
      availability,
      contactPreference
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!['client-worker', 'client-hirer'].includes(user.role)) {
      return res.status(403).json({ message: 'Only clients can create posts' });
    }

    const isWorker = user.role === 'client-worker';

    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (isWorker) {
      if (!price) {
        return res.status(400).json({ message: 'Price is required for worker posts' });
      }
      if (!deliveryTime) {
        return res.status(400).json({ message: 'Delivery time is required for worker posts' });
      }
    }

    const newPost = new Post({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      subcategory: subcategory ? subcategory.trim() : '',
      location: location.trim(),
      type: isWorker ? 'worker' : 'hirer',
      createdBy: req.user.id,
      price: isWorker ? price : null,
      deliveryTime: isWorker ? deliveryTime : null,
      extras: isWorker ? extras || '' : '',
      experience: experience || '',
      availability: availability || '',
      contactPreference: contactPreference || '',
      image: req.file ? req.file.filename : '',
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Post creation error:', err);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// My Posts
router.get('/my-posts', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name role');
    res.json(posts);
  } catch (err) {
    console.error('My posts error:', err);
    res.status(500).json({ message: 'Failed to fetch your posts' });
  }
});

// Nearby posts
router.get('/nearby', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!['client-worker', 'client-hirer'].includes(user.role)) {
      return res.status(403).json({ message: 'Only clients can view nearby posts' });
    }

    const location = user.location?.trim();
    if (!location) {
      return res.status(400).json({ message: 'User location not set or empty' });
    }

    const oppositeType = user.role === 'client-worker' ? 'hirer' : 'worker';

    const posts = await Post.find({
      location: { $regex: new RegExp(`^${location}$`, 'i') },
      type: oppositeType,
    }).populate('createdBy', 'name role');

    res.json(posts);
  } catch (err) {
    console.error('Nearby posts error:', err);
    res.status(500).json({ message: 'Failed to fetch nearby posts' });
  }
});

export default router;
