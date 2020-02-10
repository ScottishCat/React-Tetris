import { useState, useCallback } from 'react';
import { TetrominosGenerator, TetrominosTemplate } from '../Tetrominos';
import { STAGE_WIDTH, checkCollision } from '../utils';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TetrominosTemplate[0].shape,
        collided: false,
    });

    const updatePlayerPositions = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) }, collided
        }))
    }

    const resetPlayer = useCallback(
        () => {
            setPlayer({
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                tetromino: TetrominosGenerator().shape,
                collided: false
            })
        },
        []
    )

    const rotate = (tetromino, dir) => {
        // Transpos rows to cols 
        const rotated = tetromino.map((_, index) =>
            tetromino.map(col => col[index]))
        // Reverse each row
        if (dir > 0) return rotated.map(row => row.reverse());
        return rotated.reverse();
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, {x : 0, y : 0})) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return ;
            }
        }

        setPlayer(clonedPlayer);
    }

    return [player, updatePlayerPositions, resetPlayer, playerRotate];
}