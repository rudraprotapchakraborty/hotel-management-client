import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('');

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Payment Details" />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;