import styled from 'styled-components';

export const font = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
}

interface HeadingProps {
    readonly sub?: boolean;
}

export const Heading = styled.h1<HeadingProps>`
  font-size: ${props => (props.sub ? "1.5em" : "2em")};
  font-weight: 600;
  margin: 1rem 0;
  color: ${({ theme }) => theme.mainfc};
`;