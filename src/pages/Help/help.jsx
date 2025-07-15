import "./help.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";

const Help = ({ token }) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const helpme = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/helpme",
        {
          name: name,
          firstName: firstName,
          email: email,
          subject: subject,
          message: message,
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
    <div className="helpme-container">
      <h1>HELP</h1>
      <form onSubmit={helpme}>
        <div className="form-item">
          <label htmlFor="customer">Nom</label>
          <input
            type="text"
            placeholder="Votre nom"
            name="name"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            placeholder="Votre prénom"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="customer">Email</label>
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
        <div className="form-item">
          <label htmlFor="subject">Sujet</label>
          <input
            type="text"
            placeholder="Sujet"
            name="subject"
            id="subject"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="message">Message</label>
          <textarea
            rows="10"
            name="message"
            id="message"
            placeholder="Votre message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="helpme-button">
          <Button type="submit" text="Envoyer" />
        </div>
      </form>
    </div>
  );
};

export default Help;
