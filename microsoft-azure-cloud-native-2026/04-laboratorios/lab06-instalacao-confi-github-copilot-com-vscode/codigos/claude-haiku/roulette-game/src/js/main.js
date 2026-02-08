const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');

let lastTime = 0;
let roulette;
let ball;
let renderer;

function init() {
    roulette = new Roulette(canvas, ctx);
    ball = new Ball(10, '#fff', canvas.width, canvas.height);
    renderer = new Renderer(canvas);
    spinBtn.addEventListener('click', spin);
    requestAnimationFrame(mainLoop);
}

function spin() {
    spinBtn.disabled = true;
    roulette.startSpin(10); // Velocidade inicial maior
    setTimeout(() => {
        spinBtn.disabled = false;
    }, 5000); // Mais tempo para desaceleração
}

function mainLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    update(deltaTime);
    render();

    requestAnimationFrame(mainLoop);
}

function update(deltaTime) {
    roulette.update(deltaTime);
    ball.update(roulette.rotationSpeed, roulette, roulette.isSpinning);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    roulette.draw();
    ball.draw(ctx);
}

window.onload = init;