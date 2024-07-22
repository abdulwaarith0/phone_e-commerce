import { Link } from 'react-router-dom';
import Logo from "../../logo.svg";
import { Nav, ButtonContainer } from './styled';



const Navbar = () => {
  return (
    <Nav className="navbar navbar-expand- navbar-dark px-sm-5">
      <Link to="/" className="nav-link">
        <img src={Logo}
          alt="store" className="navbar-brand" />
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5">
          <Link to="/" className="nav-link">
            products
          </Link>
        </li>
      </ul>
      <Link to="/cart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <i className="fas fa-cart-plus" />
          </span>
          my cart
        </ButtonContainer>
      </Link>
    </Nav>
  );
};

export default Navbar;