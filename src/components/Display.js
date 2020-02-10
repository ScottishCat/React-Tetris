import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

const display = ({ gameOver, text }) => {
    return (
        <StyledDisplay gameOver={gameOver}>
            {text}
        </StyledDisplay>
    )
}

export default display;