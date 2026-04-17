import React, { useEffect, useState } from 'react';

const heartEmojis = ['💕', '💗', '💖', '❤️', '💘', '💝', '🩷', '♥️', '💓', '💞'];

function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create initial batch
    const initialHearts = Array.from({ length: 15 }, (_, i) => createHeart(i, true));
    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => {
        const cleaned = prev.filter((h) => Date.now() - h.created < h.duration);
        return [...cleaned, createHeart(Date.now())];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  function createHeart(id, initial = false) {
    return {
      id,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      duration: 8000 + Math.random() * 12000,
      delay: initial ? Math.random() * 8000 : 0,
      created: Date.now(),
    };
  }

  return (
    <div className="hearts-container" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}ms`,
            animationDelay: `${heart.delay}ms`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;
