import "./navmenu.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavMenu = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo-plissime" className="logo-nav" />
      </Link>
      <div className="barre"></div>
      <div className="menu">
        <div className="nav-item">
          <FontAwesomeIcon icon="chart-line" color="#E67E22" />
          <Link to="/">Pilotage</Link>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon="user" color="#E67E22" />
          <Link to="/customers">Clients</Link>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon="calendar-days" color="#E67E22" />
          <Link to="/planning">Agenda</Link>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon="euro-sign" color="#E67E22" />
          <Link to="/payments">Paiements</Link>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon="gear" color="#E67E22" />
          <Link to="/settings">Paramètres</Link>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon="question" color="#E67E22" />
          <Link to="/help">Aide</Link>
        </div>
      </div>
      <div className="barre"></div>
      <button>Déconnexion</button>
    </nav>
  );
};

export default NavMenu;
