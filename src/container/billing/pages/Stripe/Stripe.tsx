import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/container/billing/components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51P5NbHKhs45SIh5yKodziDV5N1bAqfveKGRMFDP1f4WpqyIVvYCVGKzCkjrHchSjMblOiPEOLWnIs9lsM8uXB95F00mW2ej1ds",
);

const Stripe = () => {
  const clientSecret = "pi_1234567890_secret_abcdefghijklmno";

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
