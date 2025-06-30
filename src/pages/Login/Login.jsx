/* eslint-disable react/prop-types */
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Cookies from "js-cookie";

const Login = ({ setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCoach, setIsCoach] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);

  const navigate = useNavigate();

  const login = async (event) => {
    try {
      event.preventDefault();
      if (isCoach) {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + `/user/login`,
          {
            email: email,
            password: password,
          }
        );
        localStorage.setItem("role", "coach"); 
        console.log("token=",response.data.token);
        setToken(response.data.token);
        Cookies.set("plissimeToken", response.data.token);
      } else {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + `/customer/login`,
          {
            email: email,
            password: password,
          }
        );
        localStorage.setItem("role", "customer"); 
        console.log("token=",response.data.token);
        setToken(response.data.token);
        Cookies.set("plissimeToken", response.data.token);
      }
      navigate("/");
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="Logo PLISSIME" className="logo-big" />
      <form onSubmit={login}>
        <h1>Connectez-vous à votre espace personnel</h1>
        <div className="button-choice">
          <button
            type="button"
            className="coach-button"
            onClick={() => {
              setIsCoach(!isCoach);
              setIsCustomer(!isCustomer);
            }}
            style={{ backgroundColor: isCoach && "#a8c6cc" }}
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
            style={{ backgroundColor: isCustomer && "#a8c6cc" }}
          >
            Client
          </button>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Votre email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <button>Se connecter</button>
        </div>
        <Link to="/signup">Créer mon compte</Link>
      </form>
    </div>
  );
};

export default Login;
