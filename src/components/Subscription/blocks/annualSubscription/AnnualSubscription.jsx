/* eslint-disable react/prop-types */
import styles from "./annual-subscription.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

const AnnualSubscription = ({ token }) => {
  const [promoCode, setPromoCode] = useState("");

  const subscribe = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/subscription/checkout/annual`,
        { codePromo: promoCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className={styles["annual-subscription"]}>
      <div className={styles["subscription-block"]}>
        <div className={styles["title"]}>Basic</div>
        <div className={styles["price"]}>
          <p>0€ HT/mois</p>
        </div>
        <div className={styles["item-list"]}>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Pilotez votre activité</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Dossier clients</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Version mobile</p>
          </div>
        </div>
      </div>
      <div className={styles["subscription-block"]}>
        <div className={styles["title"]}>Premium</div>
        <div className={styles["price"]}>
          <p>32,50€ HT/mois au lieu de 39€ HT/mois</p>
          <p className={styles["economy"]}>Facturé annuellement à 468€ TTC</p>
        </div>
        <div className={styles["item-list"]}>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Pilotez votre activité</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Prise de rdv en ligne</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Espace client</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Création de programme avec vidéos</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Messagerie</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Dossier client</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Paiement en ligne</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Facturation électronique</p>
          </div>
          <div className={styles["item"]}>
            <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
            <p>Version mobile</p>
          </div>
        </div>
        <div className={styles.payment}>
          <div className={styles.paymentButton} onClick={() => subscribe()}>
            Procéder au paiement
          </div>
          <div className={styles.promo}>
            <input
              type="text"
              placeholder="Votre code promo"
              value={promoCode}
              onChange={(event) => {
                setPromoCode(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualSubscription;
