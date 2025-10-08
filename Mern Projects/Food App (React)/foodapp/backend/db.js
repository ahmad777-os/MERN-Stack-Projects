const mongoose = require('mongoose');

const mongodbURI = "mongodb+srv://ahmadtariq7799:1Pw0gwJVFvokGNp8@foodapp.9oallw1.mongodb.net/FoodApp?retryWrites=true&w=majority&appName=FoodApp";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log("✅ MongoDB connected");

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📁 Collections in DB:", collections.map(c => c.name));

    const data = await mongoose.connection.db.collection("food_item").find({}).toArray();
    const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;

    console.log("📦 Food Items Loaded:", data.length);
    console.log("📂 Food Categories Loaded:", catData.length);
    
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
