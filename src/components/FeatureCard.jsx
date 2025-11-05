import React from "react";
import "../styles/Components.css";

function FeatureCard({ title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">👕</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default FeatureCard;
