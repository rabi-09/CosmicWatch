import React, { useEffect, useRef } from 'react';

const SpaceBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];
        let nebulae = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Initialize stars
        const initStars = () => {
            stars = [];
            const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 5000));
            
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    brightness: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.3 + 0.1,
                    twinkleSpeed: Math.random() * 0.05 + 0.01,
                    twinkleOffset: Math.random() * Math.PI * 2
                });
            }
        };

        // Initialize nebulae
        const initNebulae = () => {
            nebulae = [];
            for (let i = 0; i < 3; i++) {
                nebulae.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 200 + 100,
                    color: i === 0 ? 'rgba(100, 100, 255, 0.05)' : 
                           i === 1 ? 'rgba(255, 100, 255, 0.03)' : 
                           'rgba(100, 255, 255, 0.02)',
                    dx: (Math.random() - 0.5) * 0.1,
                    dy: (Math.random() - 0.5) * 0.1
                });
            }
        };

        // Draw stars
        const drawStars = (time) => {
            stars.forEach(star => {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * twinkle * 0.8})`;
                ctx.fill();
                
                // Add glow for brighter stars
                if (star.brightness > 0.5) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
                    const gradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.radius * 3
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness * 0.3})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            });
        };

        // Draw nebulae
        const drawNebulae = () => {
            nebulae.forEach(nebula => {
                const gradient = ctx.createRadialGradient(
                    nebula.x, nebula.y, 0,
                    nebula.x, nebula.y, nebula.radius
                );
                gradient.addColorStop(0, nebula.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.beginPath();
                ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });
        };

        // Draw grid
        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(100, 100, 255, 0.05)';
            ctx.lineWidth = 1;
            
            // Vertical lines
            for (let x = 0; x < canvas.width; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            // Horizontal lines
            for (let y = 0; y < canvas.height; y += 50) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        // Animation loop
        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            drawGrid();
            
            // Update and draw nebulae
            nebulae.forEach(nebula => {
                nebula.x += nebula.dx;
                nebula.y += nebula.dy;
                
                // Wrap around edges
                if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
                if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
                if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
                if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;
            });
            drawNebulae();
            
            // Draw stars
            drawStars(time * 0.001);
            
            // Move stars slowly
            stars.forEach(star => {
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });

            // Draw scan lines
            const scanY = (time * 0.05) % canvas.height;
            const gradient = ctx.createLinearGradient(0, scanY - 100, 0, scanY);
            gradient.addColorStop(0, 'rgba(0, 200, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(0, 200, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - 100, canvas.width, 100);

            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        initStars();
        initNebulae();
        animate(0);

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initStars();
            initNebulae();
        });

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full bg-space-black"
            />
            
            {/* Additional gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-space-black/0 via-space-black/30 to-space-black"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-space-accent/5 via-transparent to-space-accent/5"></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5"
                 style={{
                     backgroundImage: `linear-gradient(rgba(100, 100, 255, 0.3) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(100, 100, 255, 0.3) 1px, transparent 1px)`,
                     backgroundSize: '50px 50px'
                 }}>
            </div>
        </div>
    );
};

export default SpaceBackground;