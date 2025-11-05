import React from "react";
import OutfitCard from "./OutfitCard";
import "../styles/Wardrobe.css";

function WardrobeGrid({ items }) {
  return (
    <div className="wardrobe-grid">
      {items.map((item) => (
        <OutfitCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default WardrobeGrid;
