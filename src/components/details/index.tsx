import { ProductConsumer } from '../../context/Context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from '../navbar/styled';
// import { detailProduct } from '../../data';


interface ProductProps {
  product: {
    id: number;
    title: string;
    img: string;
    price: number;
    inCart: boolean;
    company: string,
    info: string,
  };
}


const Details: React.FC<ProductProps> = () => {
  return (
    <ProductConsumer>
      {(value) => {
        const { detailProduct } = value || {};
        if (!detailProduct) return <h1>Product not found</h1>

        const { id, company, img, info, price, title, inCart } = detailProduct;

        return (
          <div className="container py-5">
            <div className="row">
              <div className="col-10 mx-auto text-center text-title text-blue my-5">
                <h1>{title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <img src={img}
                  className="img-fluid"
                  alt="product" />
              </div>
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <h2>Model: {title}</h2>
                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                  made by: <span className="text-uppercase">
                    {company}
                  </span>
                </h4>
                <h4 className="text-blue">
                  <strong>
                    price : <span>${price}</span>
                  </strong>
                </h4>
                <h4 className="text-capitalize font-weight-bold mt-3 mb-0">
                  some info about the product:
                </h4>
                <p className="text-muted lead">
                  {info}
                </p>
                <div>
                  <Link to="/">
                    <ButtonContainer>
                      back to products
                    </ButtonContainer>
                  </Link>
                  <ButtonContainer
                    style={{
                      color: "var(--mainYellow)",
                      borderColor: "var(--mainYellow)",
                      marginTop: "1rem"
                    }}
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value?.addToCart(id);
                    }}>
                    {inCart ? "inCart" : "add to cart"}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </ProductConsumer>
  );
};

export default Details;