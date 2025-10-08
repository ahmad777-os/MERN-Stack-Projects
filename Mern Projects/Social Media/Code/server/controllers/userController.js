import User from "../models/userModel.js";

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id)
      return res.status(403).json({ msg: "Not authorized" });

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// FOLLOW USER
export const followUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id)
      return res.status(400).json({ msg: "Cannot follow yourself" });

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (userToFollow.followers.includes(req.user._id)) {
      return res.status(400).json({ msg: "Already following" });
    }

    userToFollow.followers.push(req.user._id);
    currentUser.following.push(req.params.id);

    await userToFollow.save();
    await currentUser.save();

    res.json({ msg: "User followed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// UNFOLLOW USER
export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow.followers.includes(req.user._id)) {
      return res.status(400).json({ msg: "Not following this user" });
    }

    userToUnfollow.followers.pull(req.user._id);
    currentUser.following.pull(req.params.id);

    await userToUnfollow.save();
    await currentUser.save();

    res.json({ msg: "User unfollowed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
