import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { ProductContext } from '../../context/Context';
import { contextType } from '../../context/Reducer';
import { useNavigate } from 'react-router-dom';

export const stripePromise = loadStripe('pk_test_51PgltaKwA1hJgAYJVN6qa5sOAWJ7oBaweR98WdE5uiF7tK9LLgPOCVBqXtp6l4QXN0utaORu1BvaN5pofC0tdyCW00gJbOupMz');

const CheckoutFormInner: React.FC = () => {
    const { cart, clearCart } = useContext(ProductContext) as contextType;
    const [clientSecret, setClientSecret] = useState('');
    const [_processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const stripe = useStripe();
    const elements = useElements();
    const history = useNavigate();

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ products: cart }),
                });
                const { clientSecret } = await response.json();
                setClientSecret(clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };
        fetchClientSecret();
    }, [cart]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            setProcessing(false);
            return;
        }

        try {
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (error) {
                console.error('Error processing payment:', error);
                setError('An error occurred while processing your payment. Please try again.');
                setProcessing(false);
            } else {
                clearCart();
                history('/success');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setError('An error occurred while processing your payment. Please try again.');
            setProcessing(false);
        }
    };

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <CardElement />
    //         <button type="submit" disabled={processing || !stripe || !elements || !clientSecret}>
    //             {processing ? 'Processing...' : 'Pay'}
    //         </button>
    //         {error && <div>{error}</div>}
    //     </form>
    // );

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay ${cart.reduce((total, item) => total + item.price, 0)}
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

const CheckoutForm: React.FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutFormInner />
        </Elements>
    );
};

export default CheckoutForm;