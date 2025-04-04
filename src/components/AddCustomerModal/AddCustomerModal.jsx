/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./add-customer-modal.css";
import { useState } from "react";
import axios from "axios";
import Button from "../button/button";

const AddCustomerModal = ({ token, setAddCustomerDisplay }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const addCustomer = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/customer/presignup",
        {
          email: email,
          name: name,
          firstName: firstName,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAddCustomerDisplay(false);
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <div className="addCustomerModalContainer">
      <form onSubmit={addCustomer}>
        <h1>Ajouter un client</h1>
        <div className="name">
          <input
            type="text"
            placeholder="Nom du client"
            name="name"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Prénom du client"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email du client"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Numéro de téléphone du client"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className="modal-buttons">
          <Button type="submit" text="Ajouter mon client!" />
          <Button
            type="button"
            action={() => setAddCustomerDisplay(false)}
            text="Annuler"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCustomerModal;
