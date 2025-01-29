import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
    const canvasRef = useRef(null);
    const particles = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 4 + 1;
                this.opacity = 0;
                this.fadeSpeed = Math.random() * 0.02 + 0.01;
                this.directionX = (Math.random() - 0.5) * 2;
                this.directionY = (Math.random() - 0.5) * 2;
            }

            update() {
                this.x += this.directionX;
                this.y += this.directionY;

                // Make particles fade in and out
                if (Math.random() > 0.98) {
                    this.opacity = Math.random();
                }

                if (this.x < 0 || this.x > canvas.width) this.directionX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.directionY *= -1;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = "rgba(255, 140, 0, 0.8)"; // Orange particles
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createParticles() {
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
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

        // Resize canvas on window resize
        const resizeHandler = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                backgroundColor: "#111", // Dark background
            }}
        />
    );
};

export default ParticlesBackground;
