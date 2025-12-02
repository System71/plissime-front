import styles from "./burger-menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BurgerMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles["burger-menu"]}>
      <div
        className={styles["toggle"]}
        onClick={() => setIsVisible(!isVisible)}
      >
        <FontAwesomeIcon icon="bars" color="#E67E22" size="2xl" />
      </div>
      {isVisible && (
        <div className={styles["menu"]}>
          <div
            className={styles["cross"]}
            onClick={() => setIsVisible(!isVisible)}
          >
            <FontAwesomeIcon icon="xmark" color="#E67E22" size="2xl" />
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="chart-line" color="#E67E22" size="xl" />
            <Link to="/">Pilotage</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="user" color="#E67E22" size="xl" />
            <Link to="/customers">Clients</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="calendar-days" color="#E67E22" size="xl" />
            <Link to="/planning">Agenda</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="square-binary" color="#E67E22" size="xl" />
            <Link to="/programmes">Programmes</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="euro-sign" color="#E67E22" size="xl" />
            <Link to="/payments">Paiements</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="gear" color="#E67E22" size="xl" />
            <Link to="/user/settings">Paramètres</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="question" color="#E67E22" size="xl" />
            <Link to="/help">Aide</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
