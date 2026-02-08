const Physics = {
    applyGravity(ball) {
        const gravity = 0.1; // Adjust the gravity strength as needed
        ball.velocityY += gravity;
    },

    checkCollision(ball, wheel) {
        const wheelRadius = wheel.radius;
        const ballRadius = ball.radius;

        const distance = Math.sqrt(
            Math.pow(ball.position.x - wheel.position.x, 2) +
            Math.pow(ball.position.y - wheel.position.y, 2)
        );

        if (distance < wheelRadius + ballRadius) {
            // Simple collision response
            ball.velocityY *= -0.5; // Bounce effect
            ball.position.y = wheel.position.y + wheelRadius + ballRadius; // Position the ball on the edge of the wheel
        }
    },

    updateBallPosition(ball) {
        ball.position.x += ball.velocityX;
        ball.position.y += ball.velocityY;

        // Add friction or damping to the ball's velocity
        ball.velocityX *= 0.99; // Simulate friction
        ball.velocityY *= 0.99; // Simulate friction
    }
};