import React, {useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import ToggleableMenu from "./ToggleableMenu";
import { NextContext, NextFC } from "next";

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

const NavBar: NextFC<NavBarProps> = (props) => {
    const [session, setSession] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let url = `http://${window.location.host}/api/session`;
    fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          } else {
            return;
          }
        },
        err => {
          throw err;
        }
      )
      .then(json => {
        setSession(json);
        setLoggedIn(json !== undefined);
        setLoading(false);
      });
  }, []);
    return (
      <NavWrapper>
        <Nav>
          <Link href="/">
            <NavLink>Home</NavLink>
          </Link>
          <Link href="/user/main">
            <NavLink>Main</NavLink>
          </Link>
          <Link href="/user/cards">
            <NavLink>Cards</NavLink>
          </Link>
          <Link href="/about">
            <NavLink>About</NavLink>
          </Link>
        </Nav>
        <ToggleableMenu loggedIn={loggedIn} iconName="fas fa-user-circle" />
      </NavWrapper>
    );
}
export default NavBar;