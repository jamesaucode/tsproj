import React, { useState, useContext } from "react";
import styled from "styled-components";

interface SOptionProps {
  selected?: boolean;
}
interface OverlayProps {
  show?: boolean;
}

interface ContextTypes {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isExpanded: boolean;
}

const DropDownContext = React.createContext<ContextTypes>(null);

const SOption = styled.span<SOptionProps>`
  background-color: ${({ selected }): string =>
    selected ? "#8610f9" : "#f5f5f5"};
  color: ${({ selected }): string => (selected ? "#fff" : "#333")};
  font-size: 0.8em;
  font-weight: 500;
  padding: 16px 24px;
  z-index: 100;
  &:hover {
    cursor: pointer;
    background-color: #8610f9;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 150px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;
const MenuWrapper = styled.div`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 100%;
  position: absolute;
  top: 36px;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;
const Btn = styled.button`
  border: 0;
  padding: 10px 20px;
  margin-bottom: 1rem;
  font-size: 0.8em;
  font-weight: 600;
  text-align: left;
  z-index: 100;
`;
const Overlay = styled.div<OverlayProps>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  display: ${({ show }): string => (show ? "block" : "none")};
  z-index: 10;
`;

interface CompoundComponent<P> extends React.FunctionComponent<P> {
  Option: React.FunctionComponent<OptionPropTypes>;
}
interface MenuPropTypes {
  extraOnClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}
interface OptionPropTypes {
  extraOnClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

const useDropDownContext = (): ContextTypes => {
  const context = useContext(DropDownContext);
  return context;
};

const DropDownMenu: CompoundComponent<MenuPropTypes> = (props): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState("Choose");
  const value = {
    selected,
    setSelected,
    isExpanded,
    setIsExpanded,
  };

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    setIsExpanded(!isExpanded);
    if (props.extraOnClick) {
      props.extraOnClick(event);
    }
  };
  return (
    <DropDownContext.Provider value={value}>
      <Overlay
        onClick={(): void => {
          setIsExpanded(false);
        }}
        show={isExpanded}
      />
      <Wrapper role="menu">
        <Btn onClick={handleClick}>{`${selected} ▼`}</Btn>
        <MenuWrapper>{isExpanded ? props.children : null}</MenuWrapper>
      </Wrapper>
    </DropDownContext.Provider>
  );
};

const Option: React.FunctionComponent<OptionPropTypes> = ({
  children,
  extraOnClick = (): void => {},
}): JSX.Element => {
  const { selected, setSelected, setIsExpanded } = useDropDownContext();
  const handleClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    setSelected(children.toString());
    setIsExpanded(false);
    if (extraOnClick) {
      extraOnClick(event);
    }
  };
  return (
    <SOption
      selected={selected === children}
      role="button"
      onClick={handleClick}
    >
      {children}
    </SOption>
  );
};

DropDownMenu.Option = Option;

export default DropDownMenu;
