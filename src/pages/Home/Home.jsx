import "./home.css";

const Home = () => {
  return (
    <div className="content">
      <h1>Tableau de bord</h1>
      <div className="dashboard">
        <div className="dashboard-item">
          <h2>CA du mois</h2>
        </div>
        <div className="dashboard-item">
          <h2>CA à venir</h2>
        </div>
        <div className="dashboard-item">
          <h2>Séances à venir</h2>
        </div>
        <div className="dashboard-item">
          <h2>Evolution du CA</h2>
        </div>
        <div className="dashboard-item">
          <h2>Mes séances</h2>
        </div>
        <div className="dashboard-item"></div>
      </div>
    </div>
  );
};

export default Home;
