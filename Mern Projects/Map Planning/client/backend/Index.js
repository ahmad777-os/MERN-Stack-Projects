// server/index.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Basic rule-based layout logic
function generateLayout({ totalArea, bedrooms, bathrooms }) {
  // Basic assumptions (sq ft)
  const bedroomSize = 120;
  const bathroomSize = 50;
  const kitchenSize = 100;
  const livingRoomSize = 180;
  const hallSize = 80;

  let usedArea =
    bedrooms * bedroomSize + bathrooms * bathroomSize + kitchenSize + livingRoomSize + hallSize;

  if (usedArea > totalArea) {
    return { error: "Requested rooms exceed available area." };
  }

  // Simple fixed positions (x,y,width,height) in arbitrary units
  let layout = [];
  let x = 0;
  let y = 0;

  for (let i = 0; i < bedrooms; i++) {
    layout.push({ name: `Bedroom ${i + 1}`, x, y, width: 12, height: 10 });
    y += 10;
  }
  for (let i = 0; i < bathrooms; i++) {
    layout.push({ name: `Bathroom ${i + 1}`, x: 12, y: i * 5, width: 6, height: 5 });
  }
  layout.push({ name: "Kitchen", x: 18, y: 0, width: 10, height: 10 });
  layout.push({ name: "Living Room", x: 18, y: 10, width: 20, height: 15 });
  layout.push({ name: "Hall", x: 0, y: y, width: 28, height: 8 });

  return { layout };
}

app.post("/api/layout", (req, res) => {
  const { totalArea, bedrooms, bathrooms } = req.body;
  if (!totalArea || bedrooms == null || bathrooms == null) {
    return res.status(400).json({ error: "Missing input parameters" });
  }
  const result = generateLayout({ totalArea, bedrooms, bathrooms });
  res.json(result);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
