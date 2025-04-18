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
import Planning from "./pages/Planning/Planning";
import Sessions from "./pages/Sessions/Sessions";
import Payments from "./pages/Payments/Payments";
import Settings from "./pages/Settings/Settings";
import Help from "./pages/Help/help";
import AddCustomerModal from "./components/customer/AddCustomerModal/AddCustomerModal";
import OpenCustomerModal from "./components/customer/OpenCustomerModal/OpenCustomerModal";
import AddSessionModal from "./components/session/AddSessionModal/AddSessionModal";
import OpenSessionModal from "./components/session/OpenSessionModal/OpenSessionModal";
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
} from "@fortawesome/free-solid-svg-icons";
import Layout from "./layout/Layout";
library.add(
  faUser,
  faQuestion,
  faGear,
  faEuroSign,
  faCalendarDays,
  faChartLine,
  faMagnifyingGlass,
  faCircle,
  faPlusCircle
);

function App() {
  const [token, setToken] = useState(Cookies.get("plissimeToken") || "");
  const [sessionID, setSessionID] = useState("");
  const [customerID, setCustomersID] = useState("");
  const [addSessionDisplay, setAddSessionDisplay] = useState(false);
  const [openSessionDisplay, setOpenSessionDisplay] = useState(false);
  const [addCustomerDisplay, setAddCustomerDisplay] = useState(false);
  const [openCustomerDisplay, setOpenCustomerDisplay] = useState(false);
  const [sessionsList, setSessionsList] = useState([]);
  const [customersList, setCustomersList] = useState([]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout token={token} />}>
            <Route
              index
              element={
                token ? <Home token={token} /> : <Navigate to="/login" />
              }
            ></Route>
            <Route
              path="/login"
              element={<Login setToken={setToken} />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup setToken={setToken} />}
            ></Route>
            <Route
              path="/customers"
              element={
                <Customers
                  token={token}
                  addCustomerDisplay={addCustomerDisplay}
                  setAddCustomerDisplay={setAddCustomerDisplay}
                  customersList={customersList}
                  setCustomersList={setCustomersList}
                  setCustomersID={setCustomersID}
                />
              }
            ></Route>
            <Route
              path="/planning"
              element={<Planning token={token} />}
            ></Route>
            <Route
              path="/sessions"
              element={
                <Sessions
                  token={token}
                  addSessionDisplay={addSessionDisplay}
                  setAddSessionDisplay={setAddSessionDisplay}
                  setOpenSessionDisplay={setOpenSessionDisplay}
                  setSessionID={setSessionID}
                  sessionsList={sessionsList}
                  setSessionsList={setSessionsList}
                />
              }
            ></Route>
            <Route
              path="/payments"
              element={<Payments token={token} />}
            ></Route>
            <Route
              path="/settings"
              element={<Settings token={token} />}
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
            id={sessionID}
            setCustomersList={setCustomersList}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
