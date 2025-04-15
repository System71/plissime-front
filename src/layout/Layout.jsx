/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu/NavMenu";

const Layout = ({ token }) => {
  return (
    <div className="app-layout">
      {token && <NavMenu />}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
