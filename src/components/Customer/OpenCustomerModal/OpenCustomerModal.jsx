/* eslint-disable react/prop-types */
import "./open-customer-modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../Button/button";

const OpenCustomerModal = ({
  token,
  setOpenCustomerDisplay,
  id,
  setCustomersList,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ID customer =", id);
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/customer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response=", response.data);

        setName(response.data.name);
        setFirstName(response.data.firstName);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setZip(response.data.zip);
        setCity(response.data.city);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [id, token]);

  return (
    <div className="openCustomerModalContainer">
      <div className="openCustomerModalContent">
        {isLoading ? (
          <p>EN CHARGEMENT</p>
        ) : (
          <form>
            <h1>Détail du client</h1>
            <div>
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                placeholder={name}
                name="name"
                id="name"
                value={name}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                placeholder={firstName}
                name="firstName"
                id="firstName"
                value={firstName}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder={email}
                name="email"
                id="email"
                value={email}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                placeholder={address}
                name="address"
                id="address"
                value={address}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="zip">Code postal</label>
              <input
                type="text"
                placeholder={zip}
                name="zip"
                id="zip"
                value={zip}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                placeholder={city}
                name="city"
                id="city"
                value={city}
                readOnly
              />
            </div>
            <div className="open-session-modal-buttons">
              <Button
                type="button"
                action={() => setOpenCustomerDisplay(false)}
                text="Fermer"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OpenCustomerModal;
