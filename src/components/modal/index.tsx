import React, { useContext } from 'react';
import { ModalContainer } from './styled';
import { ProductContext } from '../../context/Context';
import { ButtonContainer } from '../navbar/styled';
import { Link } from 'react-router-dom';
import { contextType } from '../../context/Reducer';

const Modal: React.FC = () => {
  const { modalOpen, modalProduct, closeModal } = useContext(ProductContext) as contextType;

  if (!modalOpen || !modalProduct) {
    return null;
  }

  const { img, title, price } = modalProduct;

  return (
    <ModalContainer>
        <div className="container">
          <div className="row">
            <div
              className="col-8 mx-auto col-md-6 col-lg-4 p-5 text-center text-capitalize"
              id="modal"
            >
              <h5>item added to cart</h5>
              <img src={img} className="img-fluid" alt="" />
              <h5>{title}</h5>
              <h5 className="text-muted">price : ${price}</h5>
              <Link to="/">
                <ButtonContainer onClick={closeModal}> 
                  Store
                </ButtonContainer>
              </Link>
              <Link to="/cart">
                <ButtonContainer
                  onClick={closeModal}
                  style={{
                    color: "var(--mainYellow)",
                    borderColor: "var(--mainYellow)",
                    marginTop: ".8rem"
                  }}
                >
                  Go To Cart
                </ButtonContainer>
              </Link>
            </div>
          </div>
        </div>
    </ModalContainer>
  );
};

export default Modal;