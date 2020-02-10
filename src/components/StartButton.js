import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';
const StartButton = ({ onClick }) => {
    return (
        <StyledStartButton onClick={onClick}>
            Start
        </StyledStartButton>
    )
}

export default StartButton;