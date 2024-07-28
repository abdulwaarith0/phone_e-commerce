// import React, { useState, useEffect, useContext } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//     CardElement,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';
// import { ProductContext } from '../../context/Context';
// import { contextType } from '../../context/Reducer';
// import { useNavigate } from 'react-router-dom';


// export const stripePromise = loadStripe('pk_test_51PgltaKwA1hJgAYJVN6qa5sOAWJ7oBaweR98WdE5uiF7tK9LLgPOCVBqXtp6l4QXN0utaORu1BvaN5pofC0tdyCW00gJbOupMz');

// const CheckoutForm: React.FC = () => {
//     const { cart, clearCart } = useContext(ProductContext) as contextType;
//     const [clientSecret, setClientSecret] = useState('');
//     const [processing, setProcessing] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const stripe = useStripe();
//     const elements = useElements();
//     const history = useNavigate();

//     useEffect(() => {
//         // Generate a Stripe payment intent on the client-side
//         const createPaymentIntent = async () => {
//             try {
//                 const response = await fetch('/create-payment-intent', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ products: cart }),
//                 });

//                 const { clientSecret } = await response.json();
//                 setClientSecret(clientSecret);
//             } catch (error) {
//                 console.error('Error creating payment intent:', error);
//             }
//         };

//         createPaymentIntent();
//     }, [cart]);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         setProcessing(true);

//         if (!stripe || !elements) {
//             setProcessing(false);
//             return;
//         }

//         try {
//             const { error: stripeError } = await stripe.confirmCardPayment(
//                 clientSecret,
//                 {
//                     payment_method: {
//                         card: elements.getElement(CardElement)!,
//                     },
//                 }
//             );

//             if (stripeError) {
//                 setError(stripeError.message);
//                 setProcessing(false);
//             } else {
//                 clearCart();
//                 history('/success');
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setError('An error occurred while processing your payment. Please try again.');
//             setProcessing(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {/* <CardElement /> */}
//             <button
//                 className="btn btn-outline-danger text-uppercase mb-3 px-5"
//                 type="submit"
//                 disabled={processing || !stripe || !elements || !clientSecret}>
//                 {processing ? 'Processing...' : 'Pay'}
//             </button>
//             {error && <div>{error}</div>}
//         </form>
//     );
// };

// export default CheckoutForm;