'use client'
import React, { useState, useRef, useEffect } from "react"
import '@/app/styles/Background.css'

export default function Background() {
    const canvasRef = useRef(null);
    const [redStar, setRedStar] = useState(null);

    const drawStars = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const numStars = 500;
        const stars = Array.from({ length: numStars }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random() * 0.7 + 0.3,
            color: "white"
        }));

        const specialStar = Math.floor(Math.random() * numStars);
        stars[specialStar].color = "yellow";
        stars[specialStar].radius = 2;
        stars[specialStar].opacity = 1;
        setRedStar(stars[specialStar]);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const currentWidth = canvas.width;
        const currentHeight = canvas.height;

        // Check if the resize event is due to a zoom action
        if (window.innerWidth === currentWidth && window.innerHeight === currentHeight) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawStars();
    }
    
    const handleCanvasClick = (e) => {
        if (redStar) {
            const x = e.clientX;
            const y = e.clientY;
            const dx = x - redStar.x;
            const dy = y - redStar.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < redStar.radius * 5) {
                window.location.href = "/secret";
            }
        }
    }

    useEffect(() => {
        drawStars();

        window.addEventListener("resize", resizeCanvas);

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0"
            onClick={handleCanvasClick}
        />
    );
}