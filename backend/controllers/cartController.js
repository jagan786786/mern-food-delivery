import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    // Find the user by their ID
    let userData = await userModel.findOne({ _id: req.body.userId });
    
    // Access the user's cart data
    let cartData = userData.cartData || {};

    // Add or update item quantity in the cart
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;  // Initialize if item does not exist
    } else {
      cartData[req.body.itemId] += 1; // Increment item quantity
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // Respond with success message
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    // Find the user by their ID
    let userData = await userModel.findOne({ _id: req.body.userId });
    
    // Access the user's cart data
    let cartData = userData.cartData || {};

    // Decrement item quantity if it exists and is greater than 0
    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      
      // Optionally, remove the item from cart if quantity reaches 0
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // Respond with success message
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    // Find the user by their ID and return the cart data
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
