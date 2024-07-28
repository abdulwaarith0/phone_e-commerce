import React, { useContext } from 'react';
import Title from '../title';
import CartColumns from './cartColumns';
import EmptyCart from './EmptyCart';
import { ProductContext } from '../../context/Context';
import { contextType } from '../../context/Reducer';
import CartList from './CartList';
import CartTotal from './CartTotal';
// import { StripeElementsOptions } from '@stripe/stripe-js';
// import CheckoutForm, { stripePromise } from './StripeButton';
// import { Elements } from '@stripe/react-stripe-js';



const Cart: React.FC = () => {
  const { cart } = useContext(ProductContext) as contextType;

  // const options: StripeElementsOptions = {

  //   appearance: {
  //   },
  // };

  if (!cart) {
    return null;
  }

  return (
    // <Elements stripe={stripePromise} options={options}>
      <section>
        {cart.length > 0 ? (
          <>
            <Title name="your" title="cart" />
            <CartColumns />
            <CartList />
            <CartTotal />
            {/* <CheckoutForm /> */}
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    // </Elements>
  );
};


export default Cart;