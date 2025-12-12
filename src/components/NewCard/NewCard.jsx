import styles from "./new-card.module.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const NewCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  console.log("stripe:", stripe);
  console.log("elements:", elements);

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
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button>Mettre à jour</button>
    </form>
  );
};

export default NewCard;
