import { Component } from 'react';
import { Link } from 'react-router-dom';
// import { ProductConsumer } from '../../context/Context';
import { ProductWapper } from '../productList/styled';

interface ProductProps {
  product: {
    id: number;
    title: string;
    img: string;
    price: number;
    inCart: boolean
  }
}

export default class Product extends Component<ProductProps> {

  render() {
    const { id, title, img, price, inCart } = this.props.product;

    const handleClick = () => {
      console.log("You clicked me on the img container");
    };

    const handleCart = () => {
      console.log("added to cart");
    }


    return (
      <ProductWapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          
          <div className="img-container p-5"
            onClick={handleClick}>
            <Link to="./details">
              <img src={img} alt="product"
                className="card-img-top" />
            </Link>
            <button className="cart-btn"
              disabled={inCart ? true : false}
              onClick={handleCart}>
              {inCart ? (<p
                className="text-capitalize, mb-0">  { " " }
                in cart
              </p>) : (<i className="fas fa-cart-plus" />)};
            </button>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">
              {title}
            </p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">
                $ {price}
              </span>
            </h5>
          </div>
        </div>
      </ProductWapper>
    )
  }
}