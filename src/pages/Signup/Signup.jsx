/* eslint-disable react/prop-types */
import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Signup = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [siret, setSiret] = useState("");
  const [certification, setCertification] = useState("");
  const [subscription, setSubscription] = useState("");
  const [isCoach, setIsCoach] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);

  // const navigate = useNavigate();

  const signup = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/customer/signup`,
        {
          email: email,
          password: password,
          name: name,
          firstName: firstName,
          address: address,
          zip: zip,
          city: city,
          phone: phone,
          activity: activity,
          siret: siret,
          certification: certification,
          subscription: subscription,
        }
      );
      setToken(response.data.token);

      console.log("response=",response);

      const onboardingRes = await axios.get(
        import.meta.env.VITE_API_URL +
          `user/stripe-onboarding/${response.data._id}`
      );

      window.location.href = onboardingRes.data.url;

      // navigate("/");
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <>
      <div className="signup">
        <img src={logo} alt="Logo PLISSIME" className="logo-big" />
        <form onSubmit={signup}>
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
            <label htmlFor="name">Nom</label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Votre nom"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="firstName"
              name="firstName"
              id="firstName"
              placeholder="Votre prénom"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="address">Adresse</label>
            <input
              type="address"
              name="address"
              id="address"
              placeholder="Votre adresse"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="zip">Code postal</label>
            <input
              type="zip"
              name="zip"
              id="zip"
              placeholder="Votre code postal"
              value={zip}
              onChange={(event) => {
                setZip(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="city">Ville</label>
            <input
              type="city"
              name="city"
              id="city"
              placeholder="Votre ville"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="phone">Téléphone</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              placeholder="Votre numéro de téléphone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="activity">Activité</label>
            <input
              type="activity"
              name="activity"
              id="activity"
              placeholder="Votre activité"
              value={activity}
              onChange={(event) => {
                setActivity(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="siret">SIRET</label>
            <input
              type="siret"
              name="siret"
              id="siret"
              placeholder="Votre SIRET"
              value={siret}
              onChange={(event) => {
                setSiret(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="subscription"
              name="subscription"
              id="subscription"
              placeholder="Abonnement choisi"
              value={subscription}
              onChange={(event) => {
                setSubscription(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="certification"
              name="certification"
              id="certification"
              placeholder="Votre numéro de certification"
              value={certification}
              onChange={(event) => {
                setCertification(event.target.value);
              }}
            />
          </div>
          <div>
            <button>Créer mon compte</button>
          </div>
          <Link to="/login">J'ai déjà mon compte !</Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
