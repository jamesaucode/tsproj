import React, { useState } from "react";
import SVG from "react-inlinesvg";
import styled from "styled-components";
import Link from 'next/link';

const Wrapper = styled.div`
  cursor: pointer;
`;
interface MenuProps {
  show: boolean;
}
const MenuWrapper = styled.div<MenuProps>`
  box-sizing: border-box;
  position: absolute;
  transition: 0.5s ease-in-out max-height;
  max-height: ${({ show }) => (show ? "100%" : "0")};
  width: 100%;
  background-color: #fff;
  top: 50px;
  left: 0;
  & > ul {
    padding: 1rem;
  }
  & > ul > li {
    opacity: ${({ show }) => (show ? "1" : "0")};
    transition: 0.5s ease-in-out opacity;
  }
`;
const Menu = styled.ul`
  font-size: calc(0.35vw + 16px);
`
const MenuItem = styled.li`
  font-size: 1.2em;
  padding: 0.5em;
`
interface PropTypes {
  loggedIn: boolean; 
} 
const BurgerMenu : React.FC<PropTypes> = ({ loggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Wrapper onClick={() => setShowMenu(!showMenu)}>
      <SVG
        src="/static/images/menu.svg"
        className={`small-icon ${showMenu ? "active" : ""}`}
      />
      <MenuWrapper show={showMenu}>
        <Menu>
          <Link href="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link href="/about">
            <MenuItem>About</MenuItem>
          </Link>
        </Menu>
      </MenuWrapper>
    </Wrapper>
  );
};

export default BurgerMenu;
