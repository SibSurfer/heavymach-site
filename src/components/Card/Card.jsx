/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Card = ({ name, image, price, onClick }) => {
  return (
    <div className="card  card-catalog" onClick={onClick} style={{ cursor: "pointer" }}>
                    {/* <img src={image} alt={name}/> */}
                    <div className="card__title">{name}</div>
                    <div className="card__descr">{price} рублей в день</div>
    </div>
  );
};

                

// const styles = {
//   card: {
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     width: "250px",
//     textAlign: "center",
//     margin: "20px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "auto",
//   },
//   name: {
//     padding: "10px",
//     fontSize: "18px",
//   },
// };

{/* <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />
      <h2 style={styles.name}>{name}</h2>
      <p>{price} рублей в день</p>
    </div> */}

export default Card;