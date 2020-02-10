export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            // Check if tetromino is empty
            if (player.tetromino[y][x] !== 0) {
                // 1. Bottom Boundary Check
                if (!stage[y + player.pos.y + moveY] ||
                    // 2. Left & Right Boundaries Check
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 3. Tetrominos Collision Check
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
}