import styles from "./customer-sport-infos.module.css";

const CustomerSportInfos = ({
  weight,
  size,
  birthday,
  workingTime,
  availibility,
  sportBackground,
  healthProblem,
  goals,
}) => {
  return (
    <div className={styles["sport-settings"]}>
      <div className={styles["line"]}>
        <div className={styles["item"]}>
          <label htmlFor="weight">Poids :</label>
          <input
            type="number"
            placeholder={weight}
            name="weight"
            id="weight"
            value={weight}
            readOnly
          />
        </div>
        <div className={styles["item"]}>
          <label htmlFor="size">Taille :</label>
          <input
            type="number"
            placeholder={size}
            name="size"
            id="size"
            value={size}
            readOnly
          />
        </div>
      </div>
      <div className={styles["line"]}>
        <div className={styles["item"]}>
          <label htmlFor="birthday">Date de naissance :</label>
          <input
            type="date"
            placeholder={birthday}
            name="birthday"
            id="birthday"
            value={birthday}
            readOnly
          />
        </div>
        <div className={styles["item"]}>
          <label htmlFor="workingTime">Temps de travail sportif:</label>
          <input
            type="number"
            placeholder={workingTime}
            name="workingTime"
            id="workingTime"
            value={workingTime}
            readOnly
          />
        </div>
      </div>

      <div className={`${styles["item"]} ${styles["line"]}`}>
        <label htmlFor="availibility">Disponibilités :</label>
        <input
          type="text"
          placeholder={availibility}
          name="availibility"
          id="availibility"
          value={availibility}
          readOnly
        />
      </div>
      <div className={styles["comment"]}>
        <label htmlFor="sportBackground">Votre passé de sportif :</label>
        <textarea
          name="sportBackground"
          id="sportBackground"
          placeholder={sportBackground}
          value={sportBackground}
          readOnly
          rows="10"
        ></textarea>
      </div>
      <div className={styles["comment"]}>
        <label htmlFor="healthProblem">Problèmes de santé :</label>
        <input
          type="text"
          placeholder={healthProblem}
          name="healthProblem"
          id="healthProblem"
          value={healthProblem}
          readOnly
        />
      </div>
      <div className={styles["comment"]}>
        <label htmlFor="goals">Objectif(s) sportif(s) :</label>
        <input
          type="text"
          placeholder={goals}
          name="goals"
          id="goals"
          value={goals}
          readOnly
        />
      </div>
    </div>
  );
};

export default CustomerSportInfos;
