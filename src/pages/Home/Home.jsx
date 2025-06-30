/* eslint-disable react/prop-types */
import "./home.css";
import CustomerUpcomingSessions from "../../components/session/customerDisplay/CustomerUpcomingSessions/CustomerUpcomingSessions.jsx";
import MonthSales from "../../components/sales/MonthSales/MonthSales.jsx"
import YearSales from "../../components/sales/YearSales/YearSales.jsx"
import UpcomingSales from "../../components/sales/UpcomingSales/UpcomingSales.jsx"
import DaySessions from "../../components/session/userDisplay/DaySessions/DaySessions.jsx"
import UserUpcomingSessions from "../../components/session/userDisplay/UserUpcomingSessions/UserUpcomingSessions.jsx";
import SessionsToPaid from "../../components/session/customerDisplay/SessionsToPaid/SessionsToPaid.jsx";
import SessionsPaid from "../../components/session/customerDisplay/SessionsPaid/SessionsPaid.jsx";

const Home = ({
  token,
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
  role
}) => {
  return (
    <>
      <h1>TABLEAU DE BORD</h1>
      {role==="coach" && (<div className="dashboard">
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
            <UserUpcomingSessions
              token={token}
              setSessionID={setSessionID}
              openSessionDisplay={openSessionDisplay}
              setOpenSessionDisplay={setOpenSessionDisplay}
            />
          </div>
        </div>
      </div>
    )} 
      {role==="customer" && (<div className="dashboard">
        <div className="first-line">
          <div className="dashboard-item">
            <CustomerUpcomingSessions token={token}/>
          </div>
        </div>
        <div className="second-line">
        <div className="dashboard-item">
          <SessionsToPaid token={token}/>
          </div>
        </div>
        <div className="third-line">
        <div className="dashboard-item">
          <SessionsPaid token={token}/>
          </div>
        </div>

      </div>
    )} 

    </>
  );
};

export default Home;
