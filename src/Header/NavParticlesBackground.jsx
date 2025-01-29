import { useEffect, useRef } from "react";

const NavParticlesBackground = () => {
    const canvasRef = useRef(null);
    const particles = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Match navbar dimensions
        canvas.width = window.innerWidth;
        canvas.height = 70;

        // Retrieve particle positions from localStorage if they exist
        const savedParticles = JSON.parse(localStorage.getItem("particles")) || [];

        class Particle {
            constructor(x, y) {
                this.x = x || Math.random() * canvas.width; // Spread across entire width
                this.y = y || Math.random() * canvas.height; // Random within navbar height
                this.size = Math.random() * 2.5 + 1;
                this.opacity = Math.random() * 0.5 + 0.2; // Start with some opacity
                this.fadeSpeed = Math.random() * 0.0001 + 0.002; // Slow fading
                this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                this.opacity += this.fadeSpeed * this.fadeDirection;
                if (this.opacity >= 0.8 || this.opacity <= 0.2) {
                    this.fadeDirection *= -1; // Reverse fading
                }
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = "rgba(0, 0, 0, 0.9)"; // Black particles
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createParticles() {
            if (savedParticles.length === 0) {
                // If no saved particles, create new ones spread across navbar
                for (let i = 0; i < 60; i++) { // Increase number of particles
                    const particle = new Particle();
                    particles.push(particle);
                    savedParticles.push({ x: particle.x, y: particle.y });
                }
                // Save positions to localStorage
                localStorage.setItem("particles", JSON.stringify(savedParticles));
            } else {
                // Use saved positions for particles
                savedParticles.forEach((position) => {
                    particles.push(new Particle(position.x, position.y));
                });
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateParticles);
        }

        createParticles();
        animateParticles();

        return () => {};
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "70px",
                backgroundColor: "#f1a90cfe",
                zIndex: -1,
            }}
        />
    );
};

export default NavParticlesBackground;
