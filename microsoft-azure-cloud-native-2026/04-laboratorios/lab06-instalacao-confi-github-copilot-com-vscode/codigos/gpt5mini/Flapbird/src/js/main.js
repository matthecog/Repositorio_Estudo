import Player from './player.js';
import Pipes from './pipes.js';
import { detectCollision, drawText } from './utils.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
window.canvas = canvas;

canvas.width = 400;
canvas.height = 600;

let gameRunning = true;
let frames = 0;
let score = 0;

const player = new Player(50, 200);
const pipes = new Pipes();

function init() {
    document.addEventListener('keydown', handleKeyDown);
    // support click/tap to jump
    document.addEventListener('pointerdown', () => player.jump());
    gameLoop();
}

function handleKeyDown(event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        player.jump();
    }
}

function gameLoop() {
    if (!gameRunning) return;

    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // spawn pipes periodically
    if (frames % 120 === 0) {
        pipes.createPipe(canvas.height);
    }

    player.update();
    player.draw(ctx);

    pipes.updatePipes();
    pipes.drawPipes(ctx);

    // Check collisions and scoring
    const ch = canvas.height;
    for (const pipe of pipes.pipes) {
        const topRect = { x: pipe.x, y: 0, width: pipes.pipeWidth, height: pipe.top };
        const bottomRect = { x: pipe.x, y: ch - pipe.bottom, width: pipes.pipeWidth, height: pipe.bottom };
        const playerRect = { x: player.x, y: player.y, width: player.width, height: player.height };

        if (detectCollision(playerRect, topRect) || detectCollision(playerRect, bottomRect)) {
            gameRunning = false;
            drawText(ctx, 'Game Over', canvas.width / 2 - 60, canvas.height / 2, '30px Arial', 'red');
            drawText(ctx, `Score: ${score}`, canvas.width / 2 - 40, canvas.height / 2 + 40, '20px Arial', 'black');
            return; // stop loop
        }

        // Scoring: when the pipe passes the player
        if (!pipe.passed && (pipe.x + pipes.pipeWidth) < player.x) {
            pipe.passed = true;
            score += 1;
        }
    }

    // Draw score
    drawText(ctx, `Score: ${score}`, 10, 30, '20px Arial', 'black');

    requestAnimationFrame(gameLoop);
}

init();