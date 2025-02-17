import "./App.css";
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
import Payments from "./pages/Payments/Payments";
import Settings from "./pages/Settings/Settings";
import Help from "./pages/Help/help";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faQuestion,
  faGear,
  faEuroSign,
  faCalendarDays,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUser,
  faQuestion,
  faGear,
  faEuroSign,
  faCalendarDays,
  faChartLine
);

function App() {
  const [token, setToken] = useState("");

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
        <Route path="/payments" element={<Payments token={token} />}></Route>
        <Route path="/settings" element={<Settings token={token} />}></Route>
        <Route path="/help" element={<Help token={token} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
