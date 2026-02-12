/* eslint-disable react/prop-types */
import styles from "./navmenu.module.css";
import logo from "../../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";

const NavMenu = ({
  setToken,
  setSessionsList,
  setCustomersList,
  role,
  setRole,
  setFirstName,
  setStripeId,
  setSub,
}) => {
  const navigate = useNavigate();

  if (role === "coach") {
    return (
      <nav>
        <NavLink to="/">
          <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} />
        </NavLink>
        <div className={styles["barre"]}></div>
        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="chart-line" color="#E67E22" size="xl" />
            <p>Pilotage</p>
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="user" color="#E67E22" size="xl" />
            <p>Clients</p>
          </NavLink>
          <NavLink
            to="/planning"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="calendar-days" color="#E67E22" size="xl" />
            <p>Agenda</p>
          </NavLink>
          <NavLink
            to="/programmes"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="square-binary" color="#E67E22" size="xl" />
            <p>Programmes</p>
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="euro-sign" color="#E67E22" size="xl" />
            <p>Paiements</p>
          </NavLink>
          <NavLink
            to="/user/settings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="gear" color="#E67E22" size="xl" />
            <p>Paramètres</p>
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="question" color="#E67E22" size="xl" />
            <p>Aide</p>
          </NavLink>
        </div>
        <div className={styles["barre"]}></div>
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
      </nav>
    );
  } else if (role === "customer") {
    return (
      <nav>
        <NavLink to="/">
          <img src={logo} alt="logo-plissime" className={styles["logo-nav"]} />
        </NavLink>
        <div className={styles["barre"]}></div>
        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="chart-line" color="#E67E22" size="xl" />
            <p>Accueil</p>
          </NavLink>
          <NavLink
            to="/mycoachs"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="user" color="#E67E22" size="xl" />
            <p>Mes coachs</p>
          </NavLink>
          <NavLink
            to="/myprograms"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="square-binary" color="#E67E22" size="xl" />
            <p>Mes programmes</p>
          </NavLink>
          <NavLink
            to="/customer/settings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="gear" color="#E67E22" size="xl" />
            <p>Mes informations</p>
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            end
          >
            <FontAwesomeIcon icon="question" color="#E67E22" size="xl" />
            <p>Aide</p>
          </NavLink>
        </div>
        <div className={styles["barre"]}></div>
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
      </nav>
    );
  }
};

export default NavMenu;
