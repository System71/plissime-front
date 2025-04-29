/* eslint-disable react/prop-types */
import "./home.css";
import DaySessions from "../../components/Session/DaySessions/DaySessions.jsx";
import MonthSales from "../../components/Sales/MonthSales/MonthSales.jsx";
import UpcomingSales from "../../components/Sales/UpcomingSales/UpcomingSales.jsx";
import YearSales from "../../components/Sales/YearSales/YearSales.jsx";
import UpcomingSessions from "../../components/Session/UpcomingSessions/UpcomingSessions.jsx";

const Home = ({
  token,
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
}) => {
  return (
    <>
      <h1>TABLEAU DE BORD</h1>
      <div className="dashboard">
        <div className="first-line">
          <div className="dashboard-item">
            <MonthSales token={token} />
          </div>
          <div className="dashboard-item">
            <YearSales token={token} />
          </div>
          <div className="dashboard-item">
            <UpcomingSales token={token} />
          </div>
        </div>
        <div className="second-line">
          <div className="dashboard-item">
            <DaySessions
              token={token}
              setSessionID={setSessionID}
              openSessionDisplay={openSessionDisplay}
              setOpenSessionDisplay={setOpenSessionDisplay}
            />
          </div>
          <div className="dashboard-item">
            <UpcomingSessions
              token={token}
              setSessionID={setSessionID}
              openSessionDisplay={openSessionDisplay}
              setOpenSessionDisplay={setOpenSessionDisplay}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
