class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRoulette(wheel) {
        // Draw the roulette wheel
        const { radius, colors } = wheel;
        this.context.beginPath();
        this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, Math.PI * 2);
        this.context.fillStyle = 'green'; // Base color for the wheel
        this.context.fill();
        this.context.stroke();

        // Draw the segments
        const segmentAngle = (Math.PI * 2) / colors.length;
        colors.forEach((color, index) => {
            this.context.beginPath();
            this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2);
            this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius, index * segmentAngle, (index + 1) * segmentAngle);
            this.context.fillStyle = color;
            this.context.fill();
            this.context.stroke();
        });
    }

    drawBall(ball) {
        // Draw the ball
        this.context.beginPath();
        this.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.context.fillStyle = 'white';
        this.context.fill();
        this.context.stroke();
    }

    render(wheel, ball) {
        this.clear();
        this.drawRoulette(wheel);
        this.drawBall(ball);
    }
}