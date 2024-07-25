import React, { useContext } from 'react';
import Title from '../title';
import CartColumns from './cartColumns';
import EmptyCart from './EmptyCart';
import { ProductContext } from '../../context/Context';
import { contextType } from '../../context/Reducer';
import CartList from './CartList';
import CartTotal from './CartTotal';


const Cart: React.FC = () => {
  const { cart } = useContext(ProductContext) as contextType;

  if (!cart) {
    return null;
  }

  return (
    <section>
      {cart.length > 0 ? (
        <>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList />
          <CartTotal />
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
};

export default Cart;