import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button, colors, font } from "../../utils/style";
import Circle from "./Icons/Circle";

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

interface InputProps {
  placeholder?: string;
}

const DropDownContext = React.createContext<ContextTypes>(null);

const SOption = styled.li<SOptionProps>`
  background-color: ${({ selected }): string =>
    selected ? `${colors.brand}40` : "#fff"};
  border-radius: 3px;
  padding: 10px;
  margin: 5px 0;
  z-index: 100;
  &:hover {
    cursor: pointer;
    background-color: ${({ selected }): string =>
      selected ? `${colors.brand}40` : "#eee"};
  }

  & > span {
    color: ${({ selected }): string => (selected ? colors.brand : "#555")};
    font-size: ${font.fontSize.sm};
    font-weight: 500;
    margin-left: 20px;
  }
`;

interface WrapperProps {
  expanded: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 250px;
  position: relative;
`;

const MenuWrapper = styled.ul<WrapperProps>`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: ${({ expanded }): string =>
    expanded ? "16px 16px 10px 10px" : "0"};
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 100;
  transition: transform 300ms ease;
  transform-origin: top left;
  transform: ${({ expanded }): string => (expanded ? "scale(1)" : "scale(0)")};

  input {
    border: none;
    border-radius: 3px;
    background-color: #eee;
    font-size: ${font.fontSize.sm};
    padding: 10px;
    margin: 10px 0;
  }
`;
const Toggle = styled.button`
  border: 0;
  border-radius: 3px;
  color: ${colors.black};
  padding: 10px 20px;
  margin-bottom: 1rem;
  font-size: 0.8em;
  font-weight: 600;
  font-family: ${font.fontFamily};
  text-align: left;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
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
const BlueButton = styled(Button)`
  padding: 10px;
  background: #0f76fc;
`;

interface CompoundComponent<P> extends React.FunctionComponent<P> {
  Option: React.FunctionComponent<OptionPropTypes>;
  MenuTitle: React.FunctionComponent;
  Input: React.FunctionComponent<InputProps>;
  MenuButton: React.FunctionComponent;
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
interface DropDownMenuProps {}
const DropDownMenu: CompoundComponent<DropDownMenuProps> = (
  props,
): JSX.Element => {
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
  };
  return (
    <DropDownContext.Provider value={value}>
      {isExpanded && (
        <Overlay role="button" onClick={handleClick} show={isExpanded} />
      )}
      <Wrapper role="menu">
        <Toggle onClick={handleClick}>{`${selected} ▼`}</Toggle>
        <MenuWrapper expanded={isExpanded}>
          {isExpanded ? props.children : null}
        </MenuWrapper>
      </Wrapper>
    </DropDownContext.Provider>
  );
};

const Heading = styled.h2`
  font-size: 1em;
  font-weight: 400;
  margin-bottom: 5px;
`;

const MenuTitle: React.FunctionComponent = ({ children }): JSX.Element => {
  return <Heading>{children}</Heading>;
};

const MenuButton: React.FunctionComponent = ({ children }): JSX.Element => {
  return <BlueButton>{children}</BlueButton>;
};

const Input: React.FunctionComponent<InputProps> = ({
  placeholder,
}): JSX.Element => {
  return <input placeholder={placeholder} />;
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
  const optionIsSelected = selected === children;
  return (
    <SOption selected={optionIsSelected} role="button" onClick={handleClick}>
      <Circle
        width={12}
        height={12}
        fill={optionIsSelected ? colors.brand : "#ddd"}
      />
      <span>{children}</span>
    </SOption>
  );
};

DropDownMenu.Option = Option;
DropDownMenu.MenuTitle = MenuTitle;
DropDownMenu.Input = Input;
DropDownMenu.MenuButton = MenuButton;

export default DropDownMenu;
