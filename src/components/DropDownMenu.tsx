import React, { useState, useContext } from "react";
import styled from "styled-components";

interface SOptionProps {
  selected?: boolean;
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
  font-size: 0.7em;
  font-weight: 500;
  padding: 16px 24px;
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
`;
const Btn = styled.button`
  border: 0;
  padding: 10px 20px;
  margin-bottom: 1rem;
  font-size: 0.7em;
  font-weight: 600;
`;

interface CompoundComponent<P = {}> extends React.FunctionComponent<P> {
  Option: React.FunctionComponent;
  Prompt: React.FunctionComponent;
}
interface MenuPropTypes {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
interface OptionPropTypes {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const useDropDownContext = (): ContextTypes => {
  const context = useContext(DropDownContext);
  return context;
};

const DropDownMenu: CompoundComponent<MenuPropTypes> = (props): JSX.Element => {
  const [selected, setSelected] = useState("Choose");
  const [isExpanded, setIsExpanded] = useState(false);
  const value = { selected, setSelected, isExpanded, setIsExpanded };

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setIsExpanded(!isExpanded);
    if (props.onClick) {
      props.onClick(event);
    }
  };
  return (
    <DropDownContext.Provider value={value}>
      <Wrapper role="menu">
        <Btn onClick={handleClick}>{`${selected} ▼`}</Btn>
        <MenuWrapper>{isExpanded ? props.children : null}</MenuWrapper>
      </Wrapper>
    </DropDownContext.Provider>
  );
};

const Prompt: React.FunctionComponent = ({ children }): JSX.Element => {
  const { isExpanded, setIsExpanded } = useDropDownContext();
  const handleClick = (): void => {
    setIsExpanded(!isExpanded);
  };
  return (
    <SOption onClick={handleClick}>
      {children ? children : "--Choose an item--"}
    </SOption>
  );
};

const Option: React.FunctionComponent<OptionPropTypes> = ({
  children,
  onClick = (): void => {},
}): JSX.Element => {
  const { selected, setSelected, setIsExpanded } = useDropDownContext();
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setSelected(children.toString());
    setIsExpanded(false);
    if (onClick) {
      onClick(event);
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
DropDownMenu.Prompt = Prompt;

export default DropDownMenu;
