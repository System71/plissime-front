import styles from "./invoice-item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const InvoiceItem = ({ date, title, statut, url }) => {
  return (
    <div className={styles["invoices-item"]}>
      <p className={styles["date"]}>{date}</p>
      <p>{title}</p>
      <p>{statut}</p>
      <Link to={url}>
        <FontAwesomeIcon icon="file-pdf" color="#E67E22" size="xl" />
      </Link>
    </div>
  );
};

export default InvoiceItem;
