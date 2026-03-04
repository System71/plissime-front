import styles from "./burger-menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import logo from "../../assets/logo.jpg";

const BurgerMenu = ({
  setToken,
  setSessionsList,
  setCustomersList,
  role,
  setRole,
  setFirstName,
  setStripeId,
  setSub,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  if (role === "coach") {
    return (
      <div className={styles["burger-menu"]}>
        {/* <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} /> */}
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
              <FontAwesomeIcon
                icon="chart-line"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link to="/" onClick={() => setIsVisible(!isVisible)}>
                Pilotage
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="user"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link to="/customers" onClick={() => setIsVisible(!isVisible)}>
                Clients
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="calendar-days"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link to="/planning" onClick={() => setIsVisible(!isVisible)}>
                Agenda
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="square-binary"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link to="/programmes" onClick={() => setIsVisible(!isVisible)}>
                Programmes
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="euro-sign"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link to="/payments" onClick={() => setIsVisible(!isVisible)}>
                Paiements
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="gear"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link
                to="/user/settings"
                onClick={() => setIsVisible(!isVisible)}
              >
                Paramètres
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="question"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link to="/help" onClick={() => setIsVisible(!isVisible)}>
                Aide
              </Link>
            </div>
            <div className={styles["disconnect"]}>
              <Button
                text="Déconnexion"
                action={() => {
                  Cookies.remove("plissimeToken");
                  localStorage.removeItem("role");
                  setToken("");
                  setRole(null);
                  setSub("");
                  setFirstName("");
                  setStripeId("");
                  setSessionsList([]);
                  setCustomersList([]);
                  navigate("/");
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else if (role === "customer") {
    return (
      <div className={styles["burger-menu"]}>
        {/* <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} /> */}
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
              <FontAwesomeIcon
                icon="chart-line"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link
                to="/"
                className={styles.picto}
                onClick={() => setIsVisible(!isVisible)}
              >
                Accueil
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="user"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link
                to="/mycoachs"
                className={styles.picto}
                onClick={() => setIsVisible(!isVisible)}
              >
                Mes coachs
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="square-binary"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link
                to="/myprograms"
                className={styles.picto}
                onClick={() => setIsVisible(!isVisible)}
              >
                Mes programmes
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="gear"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link
                to="/customer/settings"
                className={styles.picto}
                onClick={() => setIsVisible(!isVisible)}
              >
                Mes informations
              </Link>
            </div>
            <div className={styles["nav-item"]}>
              <FontAwesomeIcon
                icon="question"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <Link
                to="/help"
                className={styles.picto}
                onClick={() => setIsVisible(!isVisible)}
              >
                Aide
              </Link>
            </div>
            <div className={styles["disconnect"]}>
              <Button
                text="Déconnexion"
                action={() => {
                  Cookies.remove("plissimeToken");
                  localStorage.removeItem("role");
                  setToken("");
                  setRole(null);
                  setFirstName("");
                  setSessionsList([]);
                  setCustomersList([]);
                  navigate("/");
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default BurgerMenu;
