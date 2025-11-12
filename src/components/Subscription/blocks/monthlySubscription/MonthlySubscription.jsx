import styles from "./monthly-subscription.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MonthlySubscription = ({ token }) => {
  return (
    <div className={styles["monthly-subscription"]}>
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
          <p>39€ HT/mois soit 46,80€ TTC</p>
          <p className={styles["economy"]}>Economisez 2 mois en annuel</p>
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
        <div className={styles["payment"]}>Procéder au paiement</div>
      </div>
    </div>
  );
};

export default MonthlySubscription;
