import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 1em;
    font-size: calc(0.35vw + 16px);
`;
const Message = styled.h2`
    font-size: 1.2em;
`
const ConfirmButton = styled.button`
    background-color: #26c733;
    border: none;
    color: #fff;
    padding: .5em 1em;
`
interface PropTypes {
    onClick: (event : React.MouseEvent<HTMLButtonElement>) => void;
}
const Prompt : React.FC<PropTypes> = ({ onClick }) => {
    return (
        <Wrapper>
            <Message>Are you sure you want to delete this card?</Message>
            <ConfirmButton onClick={onClick}>Confirm</ConfirmButton>
        </Wrapper>
    )
}

export default Prompt;