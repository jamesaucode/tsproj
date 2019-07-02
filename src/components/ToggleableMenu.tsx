import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Modal from "../components/Modal";
import Login from "../components/Login";

interface PropTypes {
  iconName: string;
  loggedIn: boolean;
}
interface MenuProps {
  expanded?: boolean;
}
const DropDownWrapper = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  padding: 0 1rem;
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
  text-decoration: none;
`;
const ImportantLink = styled(StyledLink)`
  /* border: 1px solid #4285f4; */
  border: 1px solid #0f76fc;
  border-radius: 3px;
  /* color: #4285f4; */
  color: #0f76fc;
  padding: 0.5rem 1.5rem;
  font-size: 1em;
  cursor: pointer;
`;

const ProfileIcon = styled.i``;

const ToggleableMenu: React.FunctionComponent<PropTypes> = props => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { loggedIn, iconName } = props;
  const getModalProps = () => {
    return {
      Embedded: Login,
      isOpen: showModal,
      closeModal: () => {
        setShowModal(!showModal);
      },
      parentProps: { ...props }
    };
  };
  useEffect(() => {
    const collapse = () => {
      setExpanded(false);
    };
    const main = document.getElementById("main");
    if (main) {
      main.addEventListener("click", collapse);
    }
    return () => {
      main ? main.removeEventListener("click", collapse) : null;
    };
  }, []);
  const handleToggleClick = (event: React.MouseEvent) => {
    setExpanded(!expanded);
  };
  if (loggedIn) {
    return (
      <DropDownWrapper>
        <ProfileIcon className={iconName} onClick={handleToggleClick} />
        <DropdownMenu expanded={expanded}>
          <LinkWrapper>
            <Link href="/user/profile">
              <StyledLink onClick={handleToggleClick}>Profile</StyledLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <StyledLink href="/user/logout" onClick={handleToggleClick}>
              Logout
            </StyledLink>
          </LinkWrapper>
        </DropdownMenu>
      </DropDownWrapper>
    );
  } else {
    return (
      <DropDownWrapper>
        <ImportantLink
          onClick={() => {
            setShowModal(true);
          }}
        >
          Login
        </ImportantLink>
        {showModal && <Modal {...getModalProps()} />}
      </DropDownWrapper>
    );
  }
};

export default React.memo(ToggleableMenu);
