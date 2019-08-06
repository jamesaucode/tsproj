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
  height: 100%;
  min-height: 52px;
  box-sizing: border-box;
  /* border-bottom: 1px solid #eeeeee; */
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
`;
const Nav = styled.nav`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
export const NavLink = styled.li`
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
  } else if (windowSize.size.windowWidth > 700) {
    return (
      <NavWrapper>
        <Nav>
          <Link href="/">
            <NavLink>Home</NavLink>
          </Link>
          {/* Protected Nav Items */}
          {isLoggedIn && (
            <React.Fragment>
              <Link href="/user/review">
                <NavLink>Review</NavLink>
              </Link>
              <Link href="/user/groups">
                <NavLink>Groups</NavLink>
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
        <ToggleableMenu
          loggedIn={isLoggedIn}
          iconName="fas fa-user-circle"
          {...props}
        />
      </NavWrapper>
    );
  }
};
export default NavBar;
