import React from "react";
import "../../styles/pages/home.css";

export default function FeatureItem({ title, image, altText, description }) {
  return (
    <div className="feature-item">
      <img
        src={image}
        alt={altText}
        className="feature-icon"
      />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
