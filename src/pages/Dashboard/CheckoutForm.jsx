import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if(card === null) {
            return;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement>

                </CardElement>
                <button type="submit" disabled={!stripe} className="btn btn-primary mt-6">Pay</button>
            </form>
        </div>
    );
};

export default CheckoutForm;