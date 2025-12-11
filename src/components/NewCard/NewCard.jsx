import styles from "./new-card.module.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const NewCard = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      return;
    }

    // envoyer le payment_method au backend
    await fetch("/api/payment-method", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    });

    alert("Carte mise à jour !");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              "::placeholder": {
                color: "#a0a0a0",
              },
            },
            invalid: {
              color: "#fa755a",
            },
          },
          hidePostalCode: true,
        }}
        className={styles["stripe-card-element"]}
      />
      <button type="submit">Mettre à jour</button>
    </form>
  );
};

export default NewCard;
