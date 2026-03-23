/* eslint-disable react/prop-types */
import styles from "./burger-menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
      <div className={styles.burgerMenu}>
        {/* <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} /> */}
        <div className={styles.toggle} onClick={() => setIsVisible(!isVisible)}>
          <FontAwesomeIcon icon="bars" color="#E67E22" size="2xl" />
        </div>
        {isVisible && (
          <div className={styles.menu}>
            <div
              className={styles.cross}
              onClick={() => setIsVisible(!isVisible)}
            >
              <FontAwesomeIcon icon="xmark" color="#E67E22" size="2xl" />
            </div>
            <NavLink
              to="/"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="chart-line"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Pilotage</p>
            </NavLink>
            <NavLink
              to="/customers"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="user"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Clients</p>
            </NavLink>
            <NavLink
              to="/planning"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="calendar-days"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Agenda</p>
            </NavLink>
            <NavLink
              to="/programmes"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="square-binary"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Programmes</p>
            </NavLink>
            <NavLink
              to="/payments"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="euro-sign"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Paiements</p>
            </NavLink>
            <NavLink
              to="/user/settings"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="gear"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Paramètres</p>
            </NavLink>
            <NavLink
              to="/help"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="question"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Aide</p>
            </NavLink>
            <div className={styles.disconnect}>
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
      <div className={styles.burgerMenu}>
        {/* <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} /> */}
        <div className={styles.toggle} onClick={() => setIsVisible(!isVisible)}>
          <FontAwesomeIcon icon="bars" color="#E67E22" size="2xl" />
        </div>
        {isVisible && (
          <div className={styles.menu}>
            <div
              className={styles.cross}
              onClick={() => setIsVisible(!isVisible)}
            >
              <FontAwesomeIcon icon="xmark" color="#E67E22" size="2xl" />
            </div>
            <NavLink
              to="/"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="chart-line"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Accueil</p>
            </NavLink>
            <NavLink
              to="/mycoachs"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="user"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Mes coachs</p>
            </NavLink>
            <NavLink
              to="/myprograms"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="square-binary"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Mes programmes</p>
            </NavLink>
            <NavLink
              to="/customer/settings"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="gear"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Mes informations</p>
            </NavLink>
            <NavLink
              to="/help"
              onClick={() => setIsVisible(!isVisible)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              end
            >
              <FontAwesomeIcon
                icon="question"
                color="#E67E22"
                size="xl"
                fixedWidth
              />
              <p>Aide</p>
            </NavLink>
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
