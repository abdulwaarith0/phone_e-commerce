import React, { useContext } from 'react';
import Title from '../title';
import CartColumns from './cartColumns';
import EmptyCart from './EmptyCart';
import { ProductContext } from '../../context/Context';
import { contextType } from '../../context/Reducer';
import CartList from './CartList';
import CartTotal from './CartTotal';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from './StripeButton';
import { Elements } from '@stripe/react-stripe-js';



const Cart: React.FC = () => {
  const { cart } = useContext(ProductContext) as contextType;

  const stripePromise = loadStripe('pk_test_51PgltaKwA1hJgAYJVN6qa5sOAWJ7oBaweR98WdE5uiF7tK9LLgPOCVBqXtp6l4QXN0utaORu1BvaN5pofC0tdyCW00gJbOupMz');

  const options: StripeElementsOptions = {

    appearance: {
    },
  };

  if (!cart) {
    return null;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <section>
        {cart.length > 0 ? (
          <>
            <Title name="your" title="cart" />
            <CartColumns />
            <CartList />
            <CartTotal />
            <CheckoutForm stripePromise={stripePromise} />
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
  </Elements>
  );
};


export default Cart;