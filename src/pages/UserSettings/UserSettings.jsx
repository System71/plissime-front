/* eslint-disable react/prop-types */
import "./user-settings.css";
import axios from "axios";
import { useEffect, useState } from "react";

const UserSettings = ({ token }) => {
  const [email, setEmail] = useState("");
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/informations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEmail(response.data.email);
        setName(response.data.name);
        setFirstName(response.data.firstName);
        setAddress(response.data.address);
        setZip(response.data.zip);
        setCity(response.data.city);
        setPhone(response.data.phone);
        setActivity(response.data.activity);
        setSiret(response.data.siret);
        setCertification(response.data.certification);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  const modifyUser = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/user/informations`,
        {
          email: email,
          name: name,
          firstName: firstName,
          address: address,
          zip: zip,
          city: city,
          phone: phone,
          activity: activity,
          siret: siret,
          certification: certification,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <>
      <h1>SETTINGS</h1>
      <div className="user-settings">
        {isLoading ? (
          <p>En chargement</p>
        ) : (
          <form onSubmit={modifyUser}>
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
              <label htmlFor="name">Nom</label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Votre nom"
                value={name}
                readOnly
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
                readOnly
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
              <button>Modifier mes informations</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UserSettings;
