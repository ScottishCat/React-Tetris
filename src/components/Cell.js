import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TetrominosTemplate } from '../Tetrominos';

const Cell = ({ type }) => {
    return (
        <StyledCell type={type} color={TetrominosTemplate[type].color}></StyledCell>
    )
}

export default React.memo(Cell);