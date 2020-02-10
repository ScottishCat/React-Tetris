import { useState, useEffect } from 'react'
import { createStage } from '../utils';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [cleared, setCleared] = useState(0);
    useEffect(() => {

        setCleared(0);
        const sweepRows = newStage =>
            newStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setCleared(prev => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [])



        const updateStage = prevStage => {
            // Flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            )

            // Draw tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                })
            })

            // Check Collision
            if (player.collided) {
                resetPlayer()
                return sweepRows(newStage);
            }

            return newStage;
        }

        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])
    return [stage, setStage, cleared];
}