import styles from "./info-customer.module.css";

const InfoCustomer = ({
  email,
  name,
  firstName,
  address,
  zip,
  city,
  phone,
  activity,
  date,
  isActive,
  setIsActive,
  comment,
  setComment,
}) => {
  const handleChangeState = (event) => {
    setIsActive(event.target.value);
  };

  return (
    <div className={styles["admin-settings"]}>
      <div className={styles["line"]}>
        <div className={styles["item"]}>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            placeholder={name}
            name="name"
            id="name"
            value={name}
            readOnly
          />
        </div>
        <div className={styles["item"]}>
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            placeholder={firstName}
            name="firstName"
            id="firstName"
            value={firstName}
            readOnly
          />
        </div>
      </div>
      <div className={`${styles["item"]} ${styles["line"]}`}>
        <label htmlFor="address">Adresse :</label>
        <input
          type="text"
          placeholder={address}
          name="address"
          id="address"
          value={address}
          readOnly
        />
      </div>
      <div className={styles["line"]}>
        <div className={`${styles["item"]} ${styles["city"]}`}>
          <label htmlFor="zip">Code postal :</label>
          <input
            type="text"
            placeholder={zip}
            name="zip"
            id="zip"
            value={zip}
            readOnly
          />
        </div>
        <div className={styles["item"]}>
          <label htmlFor="city">Ville :</label>
          <input
            type="text"
            placeholder={city}
            name="city"
            id="city"
            value={city}
            readOnly
          />
        </div>
      </div>
      <div className={styles["line"]}>
        <div className={`${styles["item"]} ${styles["phone"]}`}>
          <label htmlFor="phone">Téléphone :</label>
          <input
            type="tel"
            placeholder={phone}
            name="phone"
            id="phone"
            value={phone}
            readOnly
          />
        </div>
        <div className={styles["item"]}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            placeholder={email}
            name="email"
            id="email"
            value={email}
            readOnly
          />
        </div>
      </div>
      <div className={styles["line"]}>
        <div className={styles["item"]}>
          <label htmlFor="activity">Profession :</label>
          <input
            type="text"
            placeholder={activity}
            name="activity"
            id="activity"
            value={activity}
            readOnly
          />
        </div>
      </div>
      <div className={styles["line"]}>
        <div className={styles["item"]}>
          <label htmlFor="date">Date de création :</label>
          <input
            type="text"
            placeholder={date}
            name="date"
            id="date"
            value={date}
            readOnly
          />
        </div>
        <div className={styles["item"]}>
          <label htmlFor="statut">Statut :</label>
          <select
            name="statut"
            id="statut"
            value={isActive}
            onChange={handleChangeState}
          >
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
        </div>
      </div>
      <div className={styles["comment"]}>
        <label htmlFor="comments">Commentaire du coach :</label>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          rows="5"
        ></textarea>
      </div>
    </div>
  );
};

export default InfoCustomer;
