import styled from "styled-components";


export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid var(--lightBlue);
    color: var(--lightBlue);
    border-radius: 0.5rem;
    padding: 0.5rem;
    letter-spacing: 0.1rem;
    cursor: pointer;
    margin: 0 0.8rem;
    transition: all 0.5s ease-in-out;
    &:hover {
        background: var(--lightBlue);
        color: var(--mainBlue);
    }
    &:focus {
        outline: none;
    }
`;

export const Nav = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
    margin: 0 0 0 1rem;
  }

  @media (max-width: 576px) {
    .navbar-nav {
      display: flex !important;
      flex-direction: row !important;
`;
