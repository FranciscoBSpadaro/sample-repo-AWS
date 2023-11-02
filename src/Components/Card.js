// Card.js
import React from 'react';
import '../styles/Card.css';

const Card = ({ title, description, onClick }) => {
  return (
    <div className="Card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
