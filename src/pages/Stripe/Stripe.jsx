/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../../components/StripeCheckoutForm/StripeCheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Stripe = () => {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const { amount, coachId, sessionId, token } = location.state;

  // Fonction pour formater le montant en euros
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + `/create-payment-intent`,
          { coachId, amount: amount * 100, sessionId }, // en centimes
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Erreur création PaymentIntent:", error);
      }
    };

    createPaymentIntent();
  }, [coachId, amount, sessionId]);

  const options = { clientSecret };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Payer votre séance</h2>

      {/* Récapitulatif du paiement */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #e9ecef",
        }}
      >
        <h3 style={{ margin: "0 0 15px 0", fontSize: "1.2em" }}>
          Récapitulatif
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Session de coaching</span>
          <span>{formatAmount(amount)}</span>
        </div>

        <hr
          style={{
            margin: "10px 0",
            border: "none",
            borderTop: "1px solid #ddd",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.2em",
            fontWeight: "bold",
          }}
        >
          <span>Total à payer</span>
          <span>{formatAmount(amount)}</span>
        </div>
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
};

export default Stripe;
