import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { NavLink } from "../components/NavBar";

interface PropTypes {
  iconName: string;
  loggedIn: boolean;
}
interface MenuProps {
  readonly expanded?: boolean;
}

const DropDownWrapper = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  margin: 0 auto;
`;


const DropdownMenu = styled.div<MenuProps>`
  border: none;
  min-width: 160px;
  padding: 0.75rem 0;
  background: #8610f9;
  border-radius: 3px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  display: ${props => (props.expanded ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  z-index: 1;
`;

const LinkWrapper = styled.div`
  height: 2.5em;
  width: 100%;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    background: #a72ffb;
  }
`;
const StyledLink = styled.a`
  font-size: 0.9em;
  font-weight: 600;
  padding: 0 1rem;
  color: white;
`;

const ProfileIcon = styled.i``;

const ToggleableMenu: React.FunctionComponent<PropTypes> = props => {
  const [expanded, setExpanded] = useState(false);
  const handleToggleClick = (event: React.MouseEvent) => {
    setExpanded(!expanded);
  };
  if (props.loggedIn) {
    return (
      <DropDownWrapper>
        <ProfileIcon className={props.iconName} onClick={handleToggleClick} />
        <DropdownMenu expanded={expanded}>
          <LinkWrapper>
            <Link href="/user/profile">
              <StyledLink onClick={handleToggleClick}>Profile</StyledLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link href="/user/logout">
              <StyledLink onClick={handleToggleClick}>Logout</StyledLink>
            </Link>
          </LinkWrapper>
        </DropdownMenu>
      </DropDownWrapper>
    );
  } else {
    return (
      <DropDownWrapper>
        <Link href="/login">
          <NavLink onClick={handleToggleClick}>Login</NavLink>
        </Link>
      </DropDownWrapper>
    );
  }
};

export default ToggleableMenu;
