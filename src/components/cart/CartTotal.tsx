import React, { useContext } from 'react';
import { ProductContext } from '../../context/Context';
import { contextType } from '../../context/Reducer';
import { Link } from 'react-router-dom';


const CartTotal: React.FC = () => {
  const { cartTotal, cartSubTotal, cartTax, clearCart } = useContext(ProductContext) as contextType;
  console.log(cartTotal);

  return (
    <>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-10 mt-2 col-sm-8 text-capitalize">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => clearCart()}>
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">
                subtotal: </span>
              <strong>${cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">
                tax: </span>
              <strong>${cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">
                total: </span>
              <strong>${cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartTotal;