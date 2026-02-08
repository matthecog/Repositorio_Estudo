class Roulette {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.rotationSpeed = 0;
        this.currentAngle = 0;
        this.isSpinning = false;
        this.radius = 300;
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
    }

    startSpin(speed) {
        this.rotationSpeed = speed;
        this.isSpinning = true;
    }

    stopSpin() {
        this.isSpinning = false;
    }

    update(deltaTime) {
        if (this.isSpinning) {
            this.currentAngle += this.rotationSpeed;
            this.currentAngle %= 360; // Keep angle within 0-360 degrees
            this.rotationSpeed *= 0.98; // Desaceleração da roda
            
            // Se velocidade for muito pequena, para completamente
            if (this.rotationSpeed < 0.1) {
                this.rotationSpeed = 0;
                this.isSpinning = false;
            }
        }
    }

    draw() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw the roulette wheel
        const radius = 300;
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
        
        this.context.save();
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.rotate(this.currentAngle * Math.PI / 180);
        
        // Draw segments
        const segmentAngle = (Math.PI * 2) / colors.length;
        colors.forEach((color, index) => {
            this.context.beginPath();
            this.context.moveTo(0, 0);
            this.context.arc(0, 0, radius, index * segmentAngle, (index + 1) * segmentAngle);
            this.context.lineTo(0, 0);
            this.context.fillStyle = color;
            this.context.fill();
            this.context.strokeStyle = '#333';
            this.context.lineWidth = 2;
            this.context.stroke();
        });
        
        // Draw center circle
        this.context.beginPath();
        this.context.arc(0, 0, 30, 0, Math.PI * 2);
        this.context.fillStyle = '#333';
        this.context.fill();
        
        this.context.restore();
    }
}