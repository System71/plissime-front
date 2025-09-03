/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../../components/StripeCheckoutForm/StripeCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Stripe = ({ coachId, amount }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + `/create-payment-intent`,
          { coachId, amount }, // 20€ en centimes
          { headers: { "Content-Type": "application/json" } }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Erreur création PaymentIntent:", error);
      }
    };

    createPaymentIntent();
  }, [coachId, amount]);

  const options = { clientSecret };

  return (
    <div>
      <h2>Payer votre séance</h2>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Stripe;
