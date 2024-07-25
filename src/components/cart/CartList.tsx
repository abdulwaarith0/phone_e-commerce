import React, { useContext } from 'react';
import CartItem from './CartItem';
import { ProductContext } from '../../context/Context';
import { contextType } from '../../context/Reducer';
import { Product } from '../../context/Reducer';


const CartList: React.FC = () => {
  const { cart, increment, decrement, removeItem } =
    useContext(ProductContext) as contextType;

  return (
    <>
      <div className="container-fluid">
        {cart.map((item: Product) => {
          return <CartItem
            key={item.id}
            item={item}
            increment={increment}
            decrement={decrement}
            removeItem={removeItem}
          />

        })}
      </div>
    </>
  )
}

export default CartList;