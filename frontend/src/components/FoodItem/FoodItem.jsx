// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
// eslint-disable-next-line react/prop-types
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt={name} />
        {!cartItems[id] ? 
          <img
            className="add"
            onClick={() => {
              console.log("Adding item with ID:", id);
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
         : 
          <div className="food-item-counter">
            <img
              onClick={() => {
                console.log("Removing item with ID:", id);
                removeFromCart(id);
              }}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => {
                console.log("Adding item with ID:", id);
                addToCart(id);
              }}
              src={assets.add_icon_green}
              alt="Add more to cart"
            />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
