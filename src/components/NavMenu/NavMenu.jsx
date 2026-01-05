/* eslint-disable react/prop-types */
import styles from "./navmenu.module.css";
import logo from "../../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const NavMenu = ({ setToken, setSessionsList, setCustomersList, role }) => {
  const navigate = useNavigate();

  if (role === "coach") {
    return (
      <nav>
        <Link to="/">
          <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} />
        </Link>
        <div className={styles["barre"]}></div>
        <div className={styles["menu"]}>
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
        <div className={styles["barre"]}></div>
        <div className={styles["disconnect"]}>
          <Button
            text="Déconnexion"
            action={() => {
              Cookies.remove("plissimeToken");
              setToken("");
              setSessionsList([]);
              setCustomersList([]);
              navigate("/");
            }}
          />
        </div>
      </nav>
    );
  } else if (role === "customer") {
    return (
      <nav>
        <Link to="/">
          <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} />
        </Link>
        <div className={styles["barre"]}></div>
        <div className={styles["menu"]}>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="chart-line" color="#E67E22" size="xl" />
            <Link to="/">Accueil</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="user" color="#E67E22" size="xl" />
            <Link to="/mycoachs">Mes coachs</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="square-binary" color="#E67E22" size="xl" />
            <Link to="/myprograms">Mes programmes</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="gear" color="#E67E22" size="xl" />
            <Link to="/customer/settings">Mes informations</Link>
          </div>
          <div className={styles["nav-item"]}>
            <FontAwesomeIcon icon="question" color="#E67E22" size="xl" />
            <Link to="/help">Aide</Link>
          </div>
        </div>
        <div className={styles["barre"]}></div>
        <div className={styles["disconnect"]}>
          <Button
            text="Déconnexion"
            action={() => {
              Cookies.remove("plissimeToken");
              setToken("");
              setSessionsList([]);
              setCustomersList([]);
              navigate("/");
            }}
          />
        </div>
      </nav>
    );
  }
};

export default NavMenu;
