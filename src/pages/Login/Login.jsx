/* eslint-disable react/prop-types */
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://site--plissime-backend--bpdg6k2n6jyf.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="Logo PLISSIME" className="logo-big" />
      <form onSubmit={login}>
        <div>
          {/* <label htmlFor="email">Email : </label> */}
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
          {/* <label htmlFor="password">Mot de passe : </label> */}
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
      </form>
      <Link to="/signup">Créer mon compte</Link>
    </div>
  );
};

export default Login;
