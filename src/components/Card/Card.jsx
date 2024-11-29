/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Card = ({ name, price, availability, onClick }) => {
  return (
    <div className="card  card-catalog" onClick={onClick} style={{ cursor: "pointer" }}>
                    <div className="card__title">{name}</div>
                    <div className="card__descr">{price} рублей в день</div>
                    <div className="card__descr available"> {availability}</div>
    </div>
  );
};


export default Card;