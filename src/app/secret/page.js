'use client'
import React, { useRef, useState, useCallback, useEffect } from "react"

export default function Secret() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;

        // Game variables
        const player = {
            x: canvas.width / 2 - 15,
            y: canvas.height - 30,
            width: 30,
            height: 30,
            dx: 0
        };

        const keys = {
            left: false,
            right: false
        };

        const drawPlayer = () => {
            context.fillStyle = 'white';
            context.fillRect(player.x, player.y, player.width, player.height);
        };

        const updatePlayer = () => {
            if (keys.left && player.x > 0) {
                player.dx = -5;
            } else if (keys.right && player.x + player.width < canvas.width) {
                player.dx = 5;
            } else {
                player.dx = 0;
            }
            player.x += player.dx;
        };

        const clearCanvas = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };

        const gameLoop = () => {
            clearCanvas();
            drawPlayer();
            updatePlayer();
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') keys.left = true;
            if (e.key === 'ArrowRight') keys.right = true;
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft') keys.left = false;
            if (e.key === 'ArrowRight') keys.right = false;
        };

        const handleTouchStart = (e) => {
            const touchX = e.touches[0].clientX;
            if (touchX < canvas.width / 2) {
                keys.left = true;
            } else {
                keys.right = true;
            }
        };

        const handleTouchEnd = (e) => {
            keys.left = false;
            keys.right = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchend', handleTouchEnd);

        gameLoop();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <main className="bg-gradient-to-b from-violetDark via-plum to-midnightDark w-screen h-screen flex items-end justify-center overflow-hidden overscroll-none pb-4">
            <canvas ref={canvasRef} />
        </main>
    )
}