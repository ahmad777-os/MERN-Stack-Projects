const express = require("express");
const Comment = require("../model/Comment");
const router = express.Router();

// Create Comment
router.post("/", async (req, res) => {
  try {
    const { text, author, post } = req.body;
    const newComment = new Comment({ text, author, post });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async(req, res) => {
    try {
        await Comment.findByIdAndDelete(re.params.id)
        res.json({msg : "Comment Deleted"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})


module.exports = router;
