import React, { useEffect, useRef, useState } from 'react';

export default function Game({ canvasRef }) {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const isDragging = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;
        let bulletIntervalId;
        let enemyIntervalId;
        let enemySpawnRate = 2000; // Initial spawn rate in milliseconds

        // Game variables
        const player = {
            x: canvas.width / 2 - 15,
            y: canvas.height - 50,
            width: 30,
            height: 30,
            dx: 0
        };

        const bullets = [];
        const enemies = [];

        const keys = {
            left: false,
            right: false
        };

        const drawPlayer = () => {
            context.fillStyle = 'white';
            context.fillRect(player.x, player.y, player.width, player.height);
        };

        const drawBullets = () => {
            context.fillStyle = 'red';
            bullets.forEach(bullet => {
                context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            });
        };

        const drawEnemies = () => {
            context.fillStyle = 'green';
            enemies.forEach(enemy => {
                context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            });
        };

        const updatePlayer = () => {
            if (keys.left && player.x > 0) {
                player.dx = -2;
            } else if (keys.right && player.x + player.width < canvas.width) {
                player.dx = 2;
            } else {
                player.dx = 0;
            }
            player.x += player.dx;
        };

        const updateBullets = () => {
            bullets.forEach((bullet, bulletIndex) => {
                bullet.y -= bullet.dy;
                if (bullet.y + bullet.height < 0) {
                    bullets.splice(bulletIndex, 1);
                }
            });
        };

        const updateEnemies = () => {
            enemies.forEach((enemy, enemyIndex) => {
                enemy.y += enemy.dy;
                if (enemy.y > canvas.height) {
                    enemies.splice(enemyIndex, 1);
                    setGameOver(true);
                }
            });
        };

        const checkCollisions = () => {
            bullets.forEach((bullet, bulletIndex) => {
                enemies.forEach((enemy, enemyIndex) => {
                    if (
                        bullet.x < enemy.x + enemy.width &&
                        bullet.x + bullet.width > enemy.x &&
                        bullet.y < enemy.y + enemy.height &&
                        bullet.y + bullet.height > enemy.y
                    ) {
                        bullets.splice(bulletIndex, 1);
                        enemies.splice(enemyIndex, 1);
                        setScore(prevScore => prevScore + 1);
                    }
                });
            });

            enemies.forEach(enemy => {
                if (
                    player.x < enemy.x + enemy.width &&
                    player.x + player.width > enemy.x &&
                    player.y < enemy.y + enemy.height &&
                    player.y + player.height > enemy.y
                ) {
                    setGameOver(true);
                }
            });
        };

        const fireBullet = () => {
            bullets.push({
                x: player.x + player.width / 2 - 2.5,
                y: player.y,
                width: 5,
                height: 10,
                dy: 5
            });
        };

        const spawnEnemy = () => {
            enemies.push({
                x: Math.random() * (canvas.width - 30),
                y: 0,
                width: 30,
                height: 30,
                dy: 2
            });
        };

        const clearCanvas = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };

        const gameLoop = () => {
            if (gameOver) {
                cancelAnimationFrame(animationFrameId);
                return;
            }
            clearCanvas();
            drawPlayer();
            drawBullets();
            drawEnemies();
            updatePlayer();
            updateBullets();
            updateEnemies();
            checkCollisions();
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
            isDragging.current = true;
        };

        const handleTouchMove = (e) => {
            if (isDragging.current) {
                const touchX = e.touches[0].clientX;
                player.x = touchX - player.width / 2;
                if (player.x < 0) player.x = 0;
                if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
            }
        };

        const handleTouchEnd = (e) => {
            isDragging.current = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('touchend', handleTouchEnd);

        gameLoop();
        bulletIntervalId = setInterval(fireBullet, 200); // Fire a bullet every 200 milliseconds
        enemyIntervalId = setInterval(spawnEnemy, enemySpawnRate); // Spawn an enemy every 2 seconds

        // Double the enemy spawn rate every minute
        const spawnRateIncreaseIntervalId = setInterval(() => {
            clearInterval(enemyIntervalId);
            enemySpawnRate /= 2;
            enemyIntervalId = setInterval(spawnEnemy, enemySpawnRate);
        }, 60000);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('mousedown', handleTouchStart);
            canvas.removeEventListener('mousemove', handleTouchMove);
            canvas.removeEventListener('mouseup', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
            clearInterval(bulletIntervalId);
            clearInterval(enemyIntervalId);
            clearInterval(spawnRateIncreaseIntervalId);
        };
    }, [canvasRef, gameOver]);

    return (
        <div className='bg-black rounded-md'>
            <canvas ref={canvasRef} width={325} height={762} />
            <div className='absolute top-0 text-white text-center text-xl mt-2'>Score: {score}</div>
            {gameOver && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 bg-sunflowerLight text-black p-8 rounded-md'>
                    <p className='text-2xl text-center'>Game Over!</p>
                    <p className='text-lg text-center'>Final Score: {score}</p>
                    <button onClick={() => window.location.reload()} className='bg-violet hover:bg-violetDark text-white px-2 py-1 rounded'>Restart</button>
                </div>
            )}
        </div>
    );
}