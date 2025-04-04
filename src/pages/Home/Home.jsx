/* eslint-disable react/prop-types */
import DaySessions from "../../components/DaySessions/DaySessions.jsx";
import "./home.css";

const Home = ({ token }) => {
  return (
    <div className="content">
      <h1>Tableau de bord</h1>
      <div className="dashboard">
        <div className="dashboard-item">
          <h2>CA DU MOIS</h2>
        </div>
        <div className="dashboard-item">
          <h2>CA A VENIR</h2>
        </div>
        <div className="dashboard-item">
          <DaySessions token={token} />
        </div>
        <div className="dashboard-item">
          <h2>EVOLUTION DU CA</h2>
        </div>
        <div className="dashboard-item">
          <h2>SEANCES A VENIR</h2>
        </div>
        <div className="dashboard-item"></div>
      </div>
    </div>
  );
};

export default Home;
