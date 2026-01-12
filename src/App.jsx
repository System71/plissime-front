import "./App.css";
import Cookies from "js-cookie";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
import AddCustomerSubscriptionModal from "./components/CustomerSubscription/AddCustomerSubscriptionModal/AddCustomerSubscriptionModal";
// import OpenCustomerSubscriptionModal from "./components/CustomerSubscription/OpenCustomerSubscriptionModal/OpenCustomerSubscriptionModal";
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
  faCheck,
  faBars,
  faXmark,
  faFilePdf,
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "./layout/Layout";
import MyPrograms from "./pages/MyPrograms/MyPrograms";
import Activation from "./pages/Activation/Activation";
import Stripe from "./pages/Stripe/Stripe";
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
  faArrowsRotate,
  faCheck,
  faBars,
  faXmark,
  faFilePdf,
  faCircleChevronRight,
  faCircleChevronLeft
);

function App() {
  const [token, setToken] = useState(Cookies.get("plissimeToken") || "");
  const [sessionID, setSessionID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [subscriptionID, setSubscriptionID] = useState("");
  const [addSessionDisplay, setAddSessionDisplay] = useState(false);
  const [openSessionDisplay, setOpenSessionDisplay] = useState(false);
  const [addCustomerDisplay, setAddCustomerDisplay] = useState(false);
  const [openCustomerDisplay, setOpenCustomerDisplay] = useState(false);
  const [addCustomerSubscriptionDisplay, setAddCustomerSubscriptionDisplay] =
    useState(false);
  const [openCustomerSubscriptionDisplay, setOpenCustomerSubscriptionDisplay] =
    useState(false);
  const [sessionsList, setSessionsList] = useState([]);
  const [activeCustomersList, setActiveCustomersList] = useState([]);
  const [inactiveCustomersList, setInactiveCustomersList] = useState([]);
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });
  const [sub, setSub] = useState("");
  const [firstName, setFirstName] = useState("");
  const [stripeId, setStripeId] = useState("");
  const [refreshCustomers, setRefreshCustomers] = useState(true);
  const [refreshCustomerSubscription, setRefreshCustomerSubscription] =
    useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/informations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSub(response.data.sub);
        setFirstName(response.data.firstName);
        setStripeId(response.data.stripeId);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setToken={setToken}
                setRole={setRole}
                setSub={setSub}
                setFirstName={setFirstName}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup setToken={setToken} token={token} setRole={setRole} />
            }
          ></Route>
          <Route
            path="/activation/:tokenparam"
            element={<Activation token={token} setToken={setToken} />}
          ></Route>
          <Route
            path="/"
            element={
              <Layout
                token={token}
                setToken={setToken}
                setSessionsList={setSessionsList}
                setCustomersList={setActiveCustomersList}
                role={role}
                setRole={setRole}
                setFirstName={setFirstName}
                setStripeId={setStripeId}
                setSub={setSub}
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
                    firstName={firstName}
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
                  activeCustomersList={activeCustomersList}
                  setActiveCustomersList={setActiveCustomersList}
                  inactiveCustomersList={inactiveCustomersList}
                  setInactiveCustomersList={setInactiveCustomersList}
                  refreshCustomers={refreshCustomers}
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
                  sub={sub}
                />
              }
            ></Route>
            <Route
              path="/programmes"
              element={<Programmes token={token} sub={sub} />}
            ></Route>
            <Route
              path="/payments"
              element={
                <Payments
                  token={token}
                  sub={sub}
                  setAddCustomerSubscriptionDisplay={
                    setAddCustomerSubscriptionDisplay
                  }
                  setOpenCustomerSubscriptionDisplay={
                    setOpenCustomerSubscriptionDisplay
                  }
                  refreshCustomerSubscription={refreshCustomerSubscription}
                />
              }
            ></Route>
            <Route
              path="/user/settings"
              element={
                <UserSettings token={token} sub={sub} stripeId={stripeId} />
              }
            ></Route>
            <Route
              path="/customer/settings"
              element={<CustomerSettings token={token} />}
            ></Route>
            <Route path="/mycoachs" element={<Coachs token={token} />}></Route>
            <Route
              path="/myprograms"
              element={<MyPrograms token={token} role={role} />}
            ></Route>
            <Route path="/help" element={<Help token={token} />}></Route>
            <Route path="/stripe" element={<Stripe />}></Route>
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
            setCustomersList={setActiveCustomersList}
            setRefreshCustomers={setRefreshCustomers}
          />
        )}
        {addCustomerSubscriptionDisplay && (
          <AddCustomerSubscriptionModal
            token={token}
            setAddCustomerSubscriptionDisplay={
              setAddCustomerSubscriptionDisplay
            }
            setRefreshCustomerSubscription={setRefreshCustomerSubscription}
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
            setRefreshCustomers={setRefreshCustomers}
          />
        )}
        {/* {openCustomerSubscriptionDisplay && (
          <OpenCustomerSubscriptionModal token={token} id={subscriptionID} />
        )} */}
      </Router>
    </div>
  );
}

export default App;
