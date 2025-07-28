import "./App.css";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Customers from "./pages/Customers/Customers";
import Programmes from "./pages/Programmes/Programmes";
import Planning from "./pages/Planning/Planning";
import Payments from "./pages/Payments/Payments";
import UserSettings from "./pages/UserSettings/UserSettings";
import CustomerSettings from "./pages/CustomerSettings/CustomerSettings";
import Help from "./pages/Help/help";
import Coachs from "./pages/Coachs/Coachs";
import AddCustomerModal from "./components/customer/AddCustomerModal/AddCustomerModal";
import OpenCustomerModal from "./components/customer/OpenCustomerModal/OpenCustomerModal";
import AddSessionModal from "./components/session/userDisplay/AddSessionModal/AddSessionModal";
import OpenSessionModal from "./components/session/userDisplay/OpenSessionModal/OpenSessionModal";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faQuestion,
  faGear,
  faEuroSign,
  faCalendarDays,
  faChartLine,
  faMagnifyingGlass,
  faCircle,
  faPlusCircle,
  faHouse,
  faPhone,
  faEnvelope,
  faArrowRight,
  faClock,
  faPenToSquare,
  faSquareBinary,
  faArrowTrendUp,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "./layout/Layout";
import MyPrograms from "./pages/MyPrograms/MyPrograms";
library.add(
  faUser,
  faQuestion,
  faGear,
  faEuroSign,
  faCalendarDays,
  faChartLine,
  faMagnifyingGlass,
  faCircle,
  faPlusCircle,
  faHouse,
  faPhone,
  faEnvelope,
  faArrowRight,
  faClock,
  faPenToSquare,
  faSquareBinary,
  faArrowTrendUp,
  faArrowsRotate
);

function App() {
  const [token, setToken] = useState(Cookies.get("plissimeToken") || "");
  const [sessionID, setSessionID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [addSessionDisplay, setAddSessionDisplay] = useState(false);
  const [openSessionDisplay, setOpenSessionDisplay] = useState(false);
  const [addCustomerDisplay, setAddCustomerDisplay] = useState(false);
  const [openCustomerDisplay, setOpenCustomerDisplay] = useState(false);
  const [sessionsList, setSessionsList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setRole={setRole} />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup setToken={setToken} />}
          ></Route>
          <Route
            path="/"
            element={
              <Layout
                token={token}
                setToken={setToken}
                setSessionsList={setSessionsList}
                setCustomersList={setCustomersList}
                role={role}
              />
            }
          >
            <Route
              index
              element={
                token ? (
                  <Home
                    token={token}
                    setSessionID={setSessionID}
                    openSessionDisplay={openSessionDisplay}
                    setOpenSessionDisplay={setOpenSessionDisplay}
                    role={role}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            ></Route>
            <Route
              path="/customers"
              element={
                <Customers
                  token={token}
                  addCustomerDisplay={addCustomerDisplay}
                  setAddCustomerDisplay={setAddCustomerDisplay}
                  openCustomerDisplay={openCustomerDisplay}
                  setOpenCustomerDisplay={setOpenCustomerDisplay}
                  setCustomerID={setCustomerID}
                  customersList={customersList}
                  setCustomersList={setCustomersList}
                />
              }
            ></Route>
            <Route
              path="/planning"
              element={
                <Planning
                  token={token}
                  addSessionDisplay={addSessionDisplay}
                  setAddSessionDisplay={setAddSessionDisplay}
                  openSessionDisplay={openSessionDisplay}
                  setOpenSessionDisplay={setOpenSessionDisplay}
                  setSessionID={setSessionID}
                  sessionsList={sessionsList}
                  setSessionsList={setSessionsList}
                />
              }
            ></Route>
            <Route
              path="/programmes"
              element={<Programmes token={token} />}
            ></Route>
            <Route
              path="/payments"
              element={<Payments token={token} />}
            ></Route>
            <Route
              path="/user/settings"
              element={<UserSettings token={token} />}
            ></Route>
            <Route
              path="/customer/settings"
              element={<CustomerSettings token={token} />}
            ></Route>
            <Route path="/mycoachs" element={<Coachs token={token} />}></Route>
            <Route
              path="/myprograms"
              element={<MyPrograms token={token} />}
            ></Route>
            <Route path="/help" element={<Help token={token} />}></Route>
          </Route>
        </Routes>
        {addSessionDisplay && (
          <AddSessionModal
            token={token}
            setAddSessionDisplay={setAddSessionDisplay}
            setSessionsList={setSessionsList}
          />
        )}
        {addCustomerDisplay && (
          <AddCustomerModal
            token={token}
            setAddCustomerDisplay={setAddCustomerDisplay}
            setCustomersList={setCustomersList}
          />
        )}
        {openSessionDisplay && (
          <OpenSessionModal
            token={token}
            setOpenSessionDisplay={setOpenSessionDisplay}
            id={sessionID}
            setSessionsList={setSessionsList}
          />
        )}
        {openCustomerDisplay && (
          <OpenCustomerModal
            token={token}
            setOpenCustomerDisplay={setOpenCustomerDisplay}
            id={customerID}
            setCustomersList={setCustomersList}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
