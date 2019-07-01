import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import ToggleableMenu from "./ToggleableMenu";
import { NextFC } from "next";
import { useLoginStatus } from "../hooks/useLoginStatus";
import { useWindowSize } from "../hooks/useWindowSize";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const NavWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
`;
const Nav = styled.nav`
  display: flex;
  max-width: 1200px;
  /* height: 40px; */
  height: 100%;
  margin: 0 auto;
  align-items: center;
`;
export const NavLink = styled.li`
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  margin-right: 4em;
  font-size: 0.9em;
  letter-spacing: 1px;
  list-style: none;
  font-weight: 600;
  color: #333333;
  cursor: pointer;
`;

const NavBar: NextFC = props => {
  const windowSize = useWindowSize();
  const [loading, setLoading] = useState<boolean>(true);
  const isLoggedIn = useLoginStatus();
  useEffect(() => {
    setLoading(false);
  }, [isLoggedIn]);
  if (loading) {
    return (
      <NavWrapper>
        <Nav />
      </NavWrapper>
    );
  } else if (windowSize > 700) {
    return (
      <NavWrapper>
        <Nav>
          <Link href="/">
            <NavLink>Home</NavLink>
          </Link>
          <Link href="/about">
            <NavLink>About</NavLink>
          </Link>
          {/* Protected Nav Items */}
          {isLoggedIn && (
            <React.Fragment>
              <Link href="/user/review">
                <NavLink>Review</NavLink>
              </Link>
              <Link href="/user/create">
                <NavLink>Make Card</NavLink>
              </Link>
              <Link href="/user/cards">
                <NavLink>Cards</NavLink>
              </Link>
            </React.Fragment>
          )}
        </Nav>
        <ToggleableMenu
          loggedIn={isLoggedIn}
          iconName="fas fa-user-circle"
          {...props}
        />
      </NavWrapper>
    );
  } else {
    return (
      <NavWrapper>
        <Nav>
          <BurgerMenu loggedIn={isLoggedIn} />
        </Nav>
      </NavWrapper>
    );
  }
};
export default NavBar;
