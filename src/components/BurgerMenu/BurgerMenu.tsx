import React, { useState } from "react";
import SVG from "react-inlinesvg";
import styled from "styled-components";
import Link from "next/link";
import { fadeIn } from "../../styles/shared";

const Wrapper = styled.div`
  cursor: pointer;
  padding: 1rem;
  margin-left: auto;
`;
interface MenuProps {
  show: boolean;
}
const MenuWrapper = styled.div<MenuProps>`
  box-sizing: border-box;
  position: absolute;
  transition: 0.75s ease-in-out max-height;
  max-height: ${({ show }): string => (show ? "100%" : "0")};
  width: 100%;
  background-color: #fff;
  top: 50px;
  left: 0;
  & > ul {
    max-height: ${({ show }): string => (show ? "100%" : "0")};
  }
  & > ul > li {
    display: ${({ show }): string => (show ? "block" : "none")};
    animation: ${fadeIn} 0.75s ease-in-out 1;
  }
`;
const Menu = styled.ul`
  font-size: calc(0.35vw + 16px);
`;
const MenuItem = styled.li`
  color: #222;
  display: block;
  font-size: 1em;
  padding: 1em 2em;
  text-align: right;
`;
interface PropTypes {
  loggedIn: boolean;
}
const BurgerMenu: React.FunctionComponent<PropTypes> = ({
  loggedIn,
}): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Wrapper onClick={(): void => setShowMenu(!showMenu)}>
      <SVG
        src="/static/images/menu.svg"
        className={`small-icon ${showMenu ? "active" : ""}`}
      />
      <MenuWrapper show={showMenu}>
        <Menu>
          <Link href="/">
            <MenuItem>Home</MenuItem>
          </Link>
          {loggedIn && (
            <>
              <Link href="/user/create">
                <MenuItem>Create Card</MenuItem>
              </Link>
              <Link href="/user/review">
                <MenuItem>Review</MenuItem>
              </Link>
              <Link href="/user/cards">
                <MenuItem>Cards</MenuItem>
              </Link>
              <Link href="/user/groups">
                <MenuItem>Groups</MenuItem>
              </Link>
            </>
          )}
        </Menu>
      </MenuWrapper>
    </Wrapper>
  );
};

export default BurgerMenu;
