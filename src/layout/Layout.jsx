/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu/NavMenu";

const Layout = ({ token, setToken, setSessionsList, setCustomersList,role }) => {
  return (
    <div className="app-layout">
      {token && (
        <NavMenu
          setToken={setToken}
          setSessionsList={setSessionsList}
          setCustomersList={setCustomersList}
          role={role}
        />
      )}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
