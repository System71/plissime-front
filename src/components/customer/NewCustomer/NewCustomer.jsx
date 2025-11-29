import styles from "./new-customer.module.css";

const NewCustomer = ({ token }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>NOUVEAUX CLIENTS</div>
      <div className={styles["content"]}>
        <p className={styles["value"]}>Nombre nouveau client</p>
        <p> +5 du mois dernier</p>
      </div>
    </div>
  );
};

export default NewCustomer;
