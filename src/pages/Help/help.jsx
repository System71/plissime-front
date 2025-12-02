import styles from "./help.module.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";

const Help = ({ token }) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const helpme = async () => {
    try {
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
    <div className={styles["helpme-container"]}>
      <div className={styles["message"]}>
        <p>
          Vous avec besoin d'aide ou vous avez une question à nous poser, c'est
          par ici que ca se passse.
        </p>
      </div>
      <div className={styles["content"]}>
        <p>Vos coordonnées :</p>
        <div className={styles["identity"]}>
          <div className={styles["form-item"]}>
            <label htmlFor="customer">Nom :</label>
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
          <div className={styles["form-item"]}>
            <label htmlFor="firstName">Prénom :</label>
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
          <div className={styles["form-item"]}>
            <label htmlFor="customer">Email :</label>
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
        </div>
        <div className={styles["your-message"]}>
          <p>Votre message :</p>
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
        <div className={styles["helpme-button"]}>
          <Button type="button" action={helpme} text="Envoyer" />
        </div>
      </div>
    </div>
  );
};

export default Help;
