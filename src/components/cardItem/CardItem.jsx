/* eslint-disable react/prop-types */
import styles from "./card-item.module.css";
import { useState, useEffect } from "react";
import NewCard from "../NewCard/NewCard";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../Button/Button";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CardItem = ({ paymentMethod, stripeId, token }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/billing/setup-intent`,
          {
            customerId: stripeId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setClientSecret(response.data.clientSecret);
        setIsLoading(false);
      } catch (error) {
        console.log("error=", error);
      }
    };
    fetchData();
  }, [token, stripeId]);

  if (isLoading || !clientSecret) {
    return <p>En chargement</p>;
  } else {
    return (
      <div className={styles.container}>
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
        </div>
        <Button
          type="button"
          text="Modifier"
          action={() => setDisplayForm(!displayForm)}
        />
        {displayForm && (
          <div className={styles["changeCard"]}>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <NewCard />
            </Elements>
          </div>
        )}
      </div>
    );
  }
};

export default CardItem;
