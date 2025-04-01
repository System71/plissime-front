import "./App.css";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import NavMenu from "./components/NavMenu/NavMenu";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Customers from "./pages/Customers/Customers";
import Planning from "./pages/Planning/Planning";
import Sessions from "./pages/Sessions/Sessions";
import Payments from "./pages/Payments/Payments";
import Settings from "./pages/Settings/Settings";
import Help from "./pages/Help/help";
import AddSessionModal from "./components/AddSessionModal/AddSessionModal";
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
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUser,
  faQuestion,
  faGear,
  faEuroSign,
  faCalendarDays,
  faChartLine,
  faMagnifyingGlass,
  faCircle
);

function App() {
  const [token, setToken] = useState(Cookies.get("plissimeToken") || "");
  const [addSessionDisplay, setAddSessionDisplay] = useState(false);

  return (
    <Router>
      {token && <NavMenu />}
      <Routes>
        <Route
          path="/"
          element={token ? <Home token={token} /> : <Navigate to="/login" />}
        ></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route path="/signup" element={<Signup setToken={setToken} />}></Route>
        <Route path="/customers" element={<Customers token={token} />}></Route>
        <Route path="/planning" element={<Planning token={token} />}></Route>
        <Route
          path="/sessions"
          element={
            <Sessions
              token={token}
              addSessionDisplay={addSessionDisplay}
              setAddSessionDisplay={setAddSessionDisplay}
            />
          }
        ></Route>
        <Route path="/payments" element={<Payments token={token} />}></Route>
        <Route path="/settings" element={<Settings token={token} />}></Route>
        <Route path="/help" element={<Help token={token} />}></Route>
      </Routes>
      {addSessionDisplay && (
        <AddSessionModal
          token={token}
          setAddSessionDisplay={setAddSessionDisplay}
        />
      )}
    </Router>
  );
}

export default App;
