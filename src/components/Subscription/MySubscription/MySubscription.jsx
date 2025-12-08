import styles from "./my-subscription.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MySubscription = () => {
  return (
    <div className={styles["my-subscription"]}>
      <div className={styles["infos"]}>
        <div className={styles["payment"]}>
          <h2>Moyen de paiement</h2>
          <p>CARTE</p>
        </div>
        <div className={styles["bills"]}>
          <p>liste factures</p>
        </div>
      </div>
      <div className={styles["subscription-block"]}>
        <div className={styles["title"]}>Premium</div>
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
      </div>
    </div>
  );
};

export default MySubscription;
