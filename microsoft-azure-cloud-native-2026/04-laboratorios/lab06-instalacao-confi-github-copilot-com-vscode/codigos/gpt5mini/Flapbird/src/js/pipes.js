class Pipes {
    constructor() {
        this.pipes = [];
        this.pipeWidth = 50;
        this.gap = 100;
        this.speed = 2;
    }

    createPipe(canvasHeight) {
        const ch = canvasHeight || (globalThis.canvas ? globalThis.canvas.height : 600);
        const topPipeHeight = Math.floor(Math.random() * (ch - this.gap - 20)) + 20;
        const bottomPipeHeight = ch - topPipeHeight - this.gap;

        const cw = globalThis.canvas ? globalThis.canvas.width : 400;
        this.pipes.push({
            x: cw,
            top: topPipeHeight,
            bottom: bottomPipeHeight,
            passed: false
        });
    }

    updatePipes() {
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].x -= this.speed;

            if (this.pipes[i].x + this.pipeWidth < 0) {
                this.pipes.splice(i, 1);
            }
        }
    }

    drawPipes(ctx) {
        ctx.fillStyle = 'green';
        for (const pipe of this.pipes) {
            const ch = globalThis.canvas ? globalThis.canvas.height : 600;
            ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.top);
            ctx.fillRect(pipe.x, ch - pipe.bottom, this.pipeWidth, pipe.bottom);
        }
    }
}

export default Pipes;