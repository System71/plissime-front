import styles from "./card-item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import NewCard from "../NewCard/NewCard";

const CardItem = ({ paymentMethod }) => {
  const [newCard, setNewCard] = useState(false);

  return (
    <>
      <div className={styles["card-item"]}>
        <p className={styles["card"]}>{paymentMethod.type}</p>
        <p>XXXX XXXX XXXX {paymentMethod.numbers}</p>
        <p>
          exp :
          {paymentMethod.exp_month >= 10
            ? paymentMethod.exp_month
            : `0${paymentMethod.exp_month} `}
          / {paymentMethod.exp_year}
        </p>
        <p onClick={() => setNewCard(true)}>Changer</p>
      </div>
      <div className={styles["changeCard"]}>
        <NewCard />
      </div>
    </>
  );
};

export default CardItem;
