'use client'
import React, { useState, useRef, useEffect } from "react"
import '@/app/styles/Background.css'

export default function Background() {
    const canvasRef = useRef(null);
    const [redStar, setRedStar] = useState(null);
    const [shootingStars, setShootingStars] = useState([]);
    const [particles, setParticles] = useState([]);

    const drawStars = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Reduce star count on mobile for better performance
        const isMobile = window.innerWidth < 768;
        const numStars = isMobile ? 400 : 800;
        
        const stars = Array.from({ length: numStars }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            color: "white",
            twinkleSpeed: Math.random() * 0.02 + 0.01
        }));

        // Create some colored stars for variety
        for (let i = 0; i < numStars * 0.1; i++) {
            const star = stars[Math.floor(Math.random() * numStars)];
            const colors = ["#864AF9", "#FF4500", "#F8E559", "#A56CC1"];
            star.color = colors[Math.floor(Math.random() * colors.length)];
            star.radius = Math.random() * 1.5 + 1;
        }

        const specialStar = Math.floor(Math.random() * numStars);
        stars[specialStar].color = "#F8E559";
        stars[specialStar].radius = 3;
        stars[specialStar].opacity = 1;
        setRedStar(stars[specialStar]);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach((star) => {
                // Twinkling effect
                star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
                star.opacity = Math.max(0.1, Math.min(1, star.opacity));
                
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Add glow effect for special stars
                if (star.color !== "white") {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = star.color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    const createShootingStar = () => {
        const newStar = {
            id: Date.now(),
            startX: Math.random() * window.innerWidth,
            startY: Math.random() * window.innerHeight * 0.5,
        };
        
        setShootingStars(prev => [...prev, newStar]);
        
        // Remove shooting star after animation
        setTimeout(() => {
            setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
        }, 3000);
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const currentWidth = canvas.width;
        const currentHeight = canvas.height;

        if (window.innerWidth === currentWidth && window.innerHeight === currentHeight) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawStars();
    }
    
    const handleCanvasClick = async (e) => {
        if (redStar) {
            const x = e.clientX;
            const y = e.clientY;
            const dx = x - redStar.x;
            const dy = y - redStar.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < redStar.radius * 8) {
                try {
                    const res = await fetch('/api/secret');
                    const data = await res.json();
                    if (data.access) {
                        window.location.href = '/secret';
                    }
                } catch (error) {
                    console.error('Failed to check access:', error);
                }
            }
        }
    }

    useEffect(() => {
        drawStars();
        
        // Generate fewer particles on mobile for better performance
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 10 : 20;
        
        const generatedParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            animationDelay: Math.random() * 8,
            animationDuration: 8 + Math.random() * 4
        }));
        setParticles(generatedParticles);
        
        // Create shooting stars periodically (less frequent on mobile)
        const shootingStarInterval = setInterval(() => {
            const chance = isMobile ? 0.2 : 0.3; // 20% on mobile, 30% on desktop
            if (Math.random() < chance) {
                createShootingStar();
            }
        }, 5000);

        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            clearInterval(shootingStarInterval);
        };
    }, []);

    return (
        <div className="absolute inset-0">
            {/* Nebula backgrounds */}
            <div className="nebula nebula-1"></div>
            <div className="nebula nebula-2"></div>
            <div className="nebula nebula-3"></div>
            
            {/* Floating particles - only render on client to avoid hydration mismatch */}
            {particles.length > 0 && particles.map(particle => (
                <div
                    key={particle.id}
                    className="floating-particle"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animationDelay: `${particle.animationDelay}s`,
                        animationDuration: `${particle.animationDuration}s`
                    }}
                />
            ))}
            
            {/* Shooting stars */}
            {shootingStars.map(star => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={{
                        left: star.startX,
                        top: star.startY,
                    }}
                />
            ))}
            
            {/* Main star canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-pointer"
                onClick={handleCanvasClick}
            />
        </div>
    );
}