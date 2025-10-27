import Restaurant from "../models/Restaurant.js";

// ✅ Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("owner", "name email"); // optional: show owner info
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("owner", "name email");
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add restaurant (owner only)
export const addRestaurant = async (req, res) => {
  try {
    const { owner, name, cuisine, rating, image } = req.body;

    // simple validation
    if (!owner || !name || !cuisine) {
      return res.status(400).json({ message: "Owner, name, and cuisine are required." });
    }

    const newRestaurant = await Restaurant.create({
      owner,
      name,
      cuisine,
      rating,
      image,
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update restaurant
export const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );
    if (!updatedRestaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
