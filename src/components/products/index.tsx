import React from 'react';
import { Link } from 'react-router-dom';
import { ProductWapper } from '../productList/styled';
import { ProductConsumer } from '../../context/Context';

interface ProductProps {
  product: {
    id: number;
    title: string;
    img: string;
    price: number;
    inCart: boolean;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { id, title, img, price, inCart } = product;

  return (
    <ProductWapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <ProductConsumer>
          {(value) => (
            <div className="img-container p-5" onClick={() => {
              value?.handleDetail(id);
            }}>
              <Link to="./details">
                <img src={img} alt={title} className="card-img-top" />
              </Link>
              <button
                className="cart-btn"
                disabled={inCart}
                onClick={() => {
                  value?.addToCart(id);
                  value?.openModal(id);
                }}
              >
                {inCart ? (
                  <p className="text-capitalize mb-0">in cart</p>
                ) : (
                  <i className="fas fa-cart-plus" />
                )}
              </button>
            </div>
          )}
        </ProductConsumer>
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          <h5 className="text-blue font-italic mb-0">
            <span className="mr-1">${price}</span>
          </h5>
        </div>
      </div>
    </ProductWapper>
  );
};

export default Product;