/* eslint-disable react/prop-types */
import styles from "./tasks.module.css";

const Tasks = ({ token }) => {
  return (
    <div className={styles["tasks-container"]}>
      <h2>TÂCHES EN ATTENTE</h2>
      <p>Suivez ici votre tâches en attente</p>
    </div>
  );
};

export default Tasks;
