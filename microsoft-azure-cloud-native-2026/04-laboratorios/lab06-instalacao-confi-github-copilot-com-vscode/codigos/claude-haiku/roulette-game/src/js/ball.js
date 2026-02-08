class Ball {
    constructor(radius, color, canvasWidth, canvasHeight) {
        this.radius = radius;
        this.color = color;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.centerX = canvasWidth / 2;
        this.centerY = canvasHeight / 2;
        this.orbitRadius = 250; // Distância do centro
        this.angle = 0; // Ângulo em radianos
        this.angularVelocity = 0; // Velocidade angular
        this.verticalOffset = 0; // Queda da bola da pista
        this.verticalVelocity = 0; // Velocidade vertical
        this.gravity = 0.4; // Força da gravidade
        this.onTrack = true; // A bola está na pista?
        this.position = { x: this.centerX + this.orbitRadius, y: this.centerY };
    }

    update(wheelRotationSpeed, roulette, isSpinning) {
        this.angularVelocity = wheelRotationSpeed * 0.05;
        this.angle += this.angularVelocity;
        
        // Calcular força centrífuga
        const centrifugalForce = this.angularVelocity * this.angularVelocity * this.orbitRadius;
        const minForceToStay = this.gravity;
        
        // Se não está girando rápido o suficiente, a bola cai
        if (centrifugalForce < minForceToStay && this.onTrack) {
            this.onTrack = false;
            this.verticalVelocity = 0;
        }
        
        if (this.onTrack) {
            // Bola na pista
            this.verticalOffset = 0;
            this.verticalVelocity = 0;
        } else {
            // Bola caindo com gravidade
            this.verticalVelocity += this.gravity;
            this.verticalOffset += this.verticalVelocity;
            
            if (this.centerY + this.verticalOffset + this.radius >= this.canvasHeight) {
                this.verticalOffset = this.canvasHeight - this.centerY - this.radius;
                this.verticalVelocity *= -0.6;
                
                if (Math.abs(this.verticalVelocity) < 0.5) {
                    this.verticalVelocity = 0;
                }
            }
        }
        
        this.position.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        this.position.y = this.centerY + Math.sin(this.angle) * this.orbitRadius + this.verticalOffset;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}