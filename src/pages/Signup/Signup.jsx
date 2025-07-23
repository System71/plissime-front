/* eslint-disable react/prop-types */
import "./signup.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import SignupCustomer from "../../components/signup/Customer/SignupCustomer";
import SignupUser from "../../components/signup/User/SignupUser";

const Signup = ({ setToken }) => {
  const [isCoach, setIsCoach] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);

  return (
    <>
      <div className="signup">
        <img src={logo} alt="Logo PLISSIME" className="logo-big" />
        <div className="signup-content">
          <div className="button-choice">
            <button
              type="button"
              className="coach-button"
              onClick={() => {
                setIsCoach(!isCoach);
                setIsCustomer(!isCustomer);
              }}
              style={{ backgroundColor: isCoach && "#e67e22" }}
            >
              Coach
            </button>
            <button
              type="button"
              className="customer-button"
              onClick={() => {
                setIsCustomer(!isCustomer);
                setIsCoach(!isCoach);
              }}
              style={{ backgroundColor: isCustomer && "#e67e22" }}
            >
              Client
            </button>
          </div>
          {isCoach ? (
            <SignupUser setToken={setToken} />
          ) : (
            <SignupCustomer setToken={setToken} />
          )}
          <Link to="/login">J'ai déjà mon compte !</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
