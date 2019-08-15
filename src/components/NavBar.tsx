import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NextFC } from "next";
import Link from "next/link";
import ToggleableMenu from "./ToggleableMenu";
import { breakPoints, colors } from "../../utils/style";
import { useWindowSize } from "../hooks/useWindowSize";
import { useUserData } from "../hooks/useUserData";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useRouter } from "next/router";

const NavWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 52px;
  box-sizing: border-box;
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
interface NavLinkProps {
  isActive?: boolean;
}
export const NavLink = styled.li<NavLinkProps>`
  color: #333333;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 600;
  letter-spacing: 1px;
  list-style: none;
  margin-right: 4em;
  position: relative;
  text-transform: uppercase;
  &::before {
    background-color: ${colors.brand};
    bottom: -10px;
    content: "";
    height: 4px;
    position: absolute;
    width: 100%;
    transition: 400ms ease transform;
    transform: ${({ isActive }): string =>
      isActive ? "scaleX(1)" : "scaleX(0)"};
    transform-origin: left;
  }
  &:hover:before {
    transform: scaleX(1);
  }
`;

const NavBar: NextFC = (props): JSX.Element => {
  const windowSize = useWindowSize();
  const userData = useUserData() || {};
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const protectedRoutes = [
    "/user/review",
    "/user/groups",
    "/user/create",
    "/user/cards",
  ];
  const { pathname } = useRouter() || { pathname: "" };
  useEffect((): void => {
    setLoading(false);
    if (userData.data) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, userData.data]);
  if (loading) {
    return (
      <NavWrapper>
        <Nav />
      </NavWrapper>
    );
  } else if (windowSize.size.windowWidth > breakPoints.md) {
    return (
      <NavWrapper>
        <Nav>
          <Link href="/">
            <NavLink
              isActive={pathname === "/" && !isHovering}
              onMouseOver={(): void => setIsHovering(true)}
              onMouseLeave={(): void => setIsHovering(false)}
            >
              Home
            </NavLink>
          </Link>
          {/* Protected Nav Items */}
          {isLoggedIn && (
            <React.Fragment>
              {protectedRoutes.map(
                (route, index): JSX.Element => (
                  <React.Fragment key={`route ${index}`}>
                    <Link href={route}>
                      <NavLink
                        isActive={pathname === route && !isHovering}
                        onMouseOver={(): void => {
                          setIsHovering(true && !(pathname === route));
                        }}
                        onMouseLeave={(): void => {
                          setIsHovering(false);
                        }}
                      >
                        {route.replace("/user/", "")}
                      </NavLink>
                    </Link>
                  </React.Fragment>
                ),
              )}
            </React.Fragment>
          )}
        </Nav>
        <ToggleableMenu loggedIn={isLoggedIn} {...props} />
      </NavWrapper>
    );
  } else {
    return (
      <NavWrapper>
        <Nav>
          <BurgerMenu loggedIn={isLoggedIn} />
        </Nav>
        <ToggleableMenu loggedIn={isLoggedIn} {...props} />
      </NavWrapper>
    );
  }
};
export default NavBar;
