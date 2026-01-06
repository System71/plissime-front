/* eslint-disable react/prop-types */
import styles from "./signup.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import SignupCustomer from "../../components/signup/Customer/SignupCustomer";
import SignupUser from "../../components/signup/User/SignupUser";

const Signup = ({ setToken, token, setRole }) => {
  const [isCoach, setIsCoach] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);

  return (
    <>
      <div className={styles["signup"]}>
        <img src={logo} alt="Logo PLISSIME" className="logo-big" />
        <div className={styles["signup-content"]}>
          <div className={styles["button-choice"]}>
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
            <SignupUser setToken={setToken} token={token} setRole={setRole} />
          ) : (
            <SignupCustomer
              setToken={setToken}
              token={token}
              setRole={setRole}
            />
          )}
          <Link to="/login">J'ai déjà mon compte !</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
