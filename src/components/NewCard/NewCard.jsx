import styles from "./new-card.module.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../Button/Button";

const NewCard = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/billing/update-success",
      },
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.cardForm}>
      <PaymentElement />
      <Button type="submit" text="Mettre à jour"></Button>
    </form>
  );
};

export default NewCard;
