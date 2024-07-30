// Navbar.jsx
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import logo from '../utils/logo.png'
import { userContext } from '../context/context';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const Navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.clear();
     Navigate('/signup');
  }

  const userValue = useContext(userContext);
  const toggleMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <Nav>
      <Logo href="#"><img src={logo} alt="" /></Logo>
      <Burger onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </Burger>
      <Menu isOpen={isBurgerOpen}>
        <MenuItem href="#">About</MenuItem>
        <MenuItem href="#">Services</MenuItem>
        <MenuItem href="#">Contact</MenuItem>
         <MenuItem>
         {userValue.name?<AuthButton>
          <SignUp onClick={e=>{Navigate('/signup')}}>Sign Up</SignUp>
          <Login onClick={e=>{Navigate('/signup')}}>Login</Login>
         </AuthButton>:
           <Details>
              <p>hi!!&nbsp;{userValue.user.name}</p>
              <Logout onClick={handleLogout}>Log Out</Logout>
          </Details>
          }
         </MenuItem>
      </Menu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  height: 8vh;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
`;

const Logo = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 24px;

  img{
    height: 7vh;
    border-radius: 50%;
  }
`;

const Burger = styled.div`
  display: none;
  cursor: pointer;
  div {
    width: 25px;
    height: 3px;
    background-color: #fff;
    margin: 5px;
    transition: all 0.3s linear;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 6rem;
    left: 0;
    width: 100%;
    background-color: #333;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
`;

const MenuItem = styled.a`
font-weight: 600;
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  padding: 10px 0;

  @media (max-width: 768px) {
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;

const AuthButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 4px;
`;
const SignUp = styled.button`
cursor: pointer;
min-height: 4vh;
font-weight: 600;
min-width: 4vw;
border: 1px solid white;
background-color: black;
color: white;
transition: 0.3s ease;
&:hover{
      background-color: white;
      color: black;
  }
`;
const Login = styled.button`
cursor: pointer;
min-height: 4vh;
font-weight: 600;
min-width: 4vw;
transition: 0.3s ease;
&:hover{
border: 1px solid white;
  background-color: black;
color: white;
}
`;

const Details = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 4px;
 p{
  color: white;
 }
`;
const Logout = styled.button`
cursor: pointer;
 background-color: none;
 border: none;
 min-height: 4vh;
 font-weight: 600;
 border-radius:4px;
 transition: 0.3s ease;
 &:hover{
  border: 1px solid white;
  color: white;
  background-color: black;
 }
`;
