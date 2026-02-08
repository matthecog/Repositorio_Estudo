class Player {
    constructor(x, y) {
        this.x = x; // Horizontal position
        this.y = y; // Vertical position
        this.width = 34; // Width of Mario
        this.height = 34; // Height of Mario
        this.gravity = 0.6; // Gravity effect
        this.lift = -15; // Jump strength
        this.velocity = 0; // Current velocity
        this.image = new Image(); // Image for Mario
        this.loaded = false;
        this.image.onload = () => { this.loaded = true; };
        this.image.onerror = () => { this.loaded = false; };
        this.image.src = 'assets/sprites/mario.png'; // Path to Mario sprite (add your image here)
    }

    jump() {
        this.velocity = this.lift; // Set velocity to jump strength
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        const canvasEl = globalThis.canvas || document.getElementById('gameCanvas');
        // Prevent Mario from falling below the ground
        if (this.y + this.height >= (canvasEl ? canvasEl.height : 600)) {
            this.y = (canvasEl ? canvasEl.height : 600) - this.height;
            this.velocity = 0;
        }
    }

    draw(ctx) {
        // Only draw the image if it loaded successfully; otherwise draw a simple fallback
        if (this.loaded && this.image.complete && this.image.naturalWidth > 0) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = '#ffcc00';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = '#000';
            ctx.font = '16px sans-serif';
            ctx.fillText('M', this.x + 8, this.y + 24);
        }
    }
}

export default Player;