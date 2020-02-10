import React, { useState } from 'react';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { StyledTetris, StyledTetrisWrapper } from '../components/styles/StyledTetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { createStage, checkCollision } from '../utils';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameover, setGameover] = useState(false);
    const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, cleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(cleared);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPosition({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setDropTime(1000);
        setGameover(false);
        setScore(0);
        setLevel(1);
        setRows(0);
    }

    const drop = () => {
        if (rows > (level + 1) * 5) {
            setLevel(prev => prev + 1);
            setDropTime(prev => prev / (level + 1) + 200);
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPosition({ x: 0, y: 1, collided: false });
        } else {
            // GameOver
            if (player.pos.y < 1) {
                console.log("Game Over!");
                setGameover(true);
                setDropTime(null);
            }
            updatePlayerPosition({ x: 0, y: 0, collided: true })
        }
    }

    const move = ({ keyCode }) => {
        if (!gameover) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                drop();
            } else if (keyCode == 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role='button' tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameover ? (
                        <Display gameOver={gameover} text="Game Over" />
                    ) : (
                            <div>
                                <Display text={`Score ${score}`} />
                                <Display text={`Rows ${rows}`} />
                                <Display text={`Level ${level}`} />
                            </div>
                        )}
                    <StartButton onClick={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;