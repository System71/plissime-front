/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu/NavMenu";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";

const Layout = ({
  token,
  setToken,
  setSessionsList,
  setCustomersList,
  role,
  setRole,
  setFirstName,
  setStripeId,
  setSub,
}) => {
  return (
    <div className="app-layout">
      {token && (
        <NavMenu
          setToken={setToken}
          setSessionsList={setSessionsList}
          setCustomersList={setCustomersList}
          role={role}
          setRole={setRole}
          setFirstName={setFirstName}
          setStripeId={setStripeId}
          setSub={setSub}
        />
      )}
      {token && <BurgerMenu />}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
