import React from "react";
import "../styles/Wardrobe.css";

function OutfitCard({ item }) {
  return (
    <div className="outfit-card">
      <img src={item.image} alt={item.name} className="outfit-img" />
      <div className="outfit-info">
        <h3>{item.name}</h3>
        <p>
          {item.type} | {item.color}
        </p>
      </div>
    </div>
  );
}

export default OutfitCard;
