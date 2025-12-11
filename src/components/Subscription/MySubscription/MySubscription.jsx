import styles from "./my-subscription.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import InvoiceItem from "../../InvoiceItem/InvoiceItem";
import CardItem from "../../cardItem/CardItem";

const MySubscription = ({ token, stripeId }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState({});

  //Fetch invoices
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/stripe/invoices/${stripeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInvoices(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error=", error);
      }
    };
    fetchData();
  }, [stripeId]);

  //Fetch payment method
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/stripe/payment-method/${stripeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPaymentMethod(response.data);
      } catch (error) {
        console.log("error=", error);
      }
    };
    fetchData();
  }, [stripeId]);

  if (!isLoading) {
    return (
      <div className={styles["my-subscription"]}>
        <div className={styles["infos"]}>
          <div className={styles["payment"]}>
            <h2>Moyen de paiement</h2>
            <CardItem paymentMethod={paymentMethod} />
          </div>
          <div className={styles["invoices"]}>
            <h2>Factures</h2>
            <div className={styles["invoices-list"]}>
              {invoices.map((invoice, index) => (
                <InvoiceItem
                  date={invoice.date}
                  title={invoice.title}
                  statut={invoice.status}
                  url={invoice.pdf}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles["subscription-block"]}>
          <div className={styles["title"]}>Premium</div>
          <div className={styles["item-list"]}>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Pilotez votre activité</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Prise de rdv en ligne</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Espace client</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Création de programme avec vidéos</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Messagerie</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Dossier client</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Paiement en ligne</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Facturation électronique</p>
            </div>
            <div className={styles["item"]}>
              <FontAwesomeIcon icon="check" color="#E67E22" size="xl" />
              <p>Version mobile</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MySubscription;
