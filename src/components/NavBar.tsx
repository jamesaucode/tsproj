import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import ToggleableMenu from "./ToggleableMenu";
import { NextFC } from "next";

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
  height: 40px;
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
interface NavBarProps {
  loggedIn: boolean;
  session: any;
}

const NavBar: NextFC<NavBarProps> = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    if (props.session) {
      setLoggedIn(props.session.hasOwnProperty("passport"));
    }
  }, [props.session]);
  if (loading) {
    return (
      <NavWrapper>
        <Nav />
      </NavWrapper>
    );
  } else
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
          {loggedIn && (
            <React.Fragment>
              <Link href="/user/create">
                <NavLink>Make Card</NavLink>
              </Link>
              <Link href="/user/cards">
                <NavLink>Cards</NavLink>
              </Link>
            </React.Fragment>
          )}
        </Nav>
        <ToggleableMenu loggedIn={loggedIn} iconName="fas fa-user-circle" />
      </NavWrapper>
    );
};
export default React.memo(NavBar);
