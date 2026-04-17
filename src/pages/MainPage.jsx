import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts.jsx';

/* ============================================
   ✏️ EDIT THESE - No button text progression
   ============================================ */
const noButtonTexts = [
  "No 😢",
  "Pkka nhi chalogi? 🥺",
  "Bodmosi nhi jldi yes kro? 😭",
  "Soch lo bar bar nhi puchunga 💔",
  "Kaise nhi jaogi jana pdega 😿",
  "Ho gya bodmosi yes kro 😭😭",
  "I am zippped 🤐",
  "Don't do this to me! 💀",
  "Last chance... 🥀",
  "Okay fine... love try again 😏",
  "Khel ktm",
];

/* How many "No" clicks before the button starts dodging */
const DODGE_AFTER_CLICKS = 5;

function MainPage() {
  const navigate = useNavigate();
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [isDodging, setIsDodging] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const noBtnRef = useRef(null);

  const handleYes = () => {
    navigate('/yes');
  };

  const handleNo = () => {
    const next = noCount + 1;
    setNoCount(next);
    setYesScale((prev) => prev + 0.18);

    if (next >= DODGE_AFTER_CLICKS) {
      setIsDodging(true);
    }
  };
  var xx = 0.1;
  var yy = 0.1;
  const dodgeButton = useCallback(() => {
    if (!isDodging) return;

    const padding = 100;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;
    const newX = padding + xx * (maxX - padding);
    const newY = padding + yy * (maxY - padding);
    xx += 0.1;
    yy += 0.2;
    setNoPosition({ x: newX, y: newY });

    // Advance text on dodge too
    setNoCount((prev) => prev + 1);
  }, [isDodging]);

  // Add sparkle effect around Yes button
  useEffect(() => {
    const interval = setInterval(() => {
      if (yesScale > 1.2) {
        setSparkles((prev) => {
          const newSparkles = Array.from({ length: 2 }, (_, i) => ({
            id: Date.now() + i,
            x: -30 + Math.random() * 60,
            y: -30 + Math.random() * 60,
            delay: Math.random() * 1000,
          }));
          const cleaned = prev.filter((s) => Date.now() - s.id < 2000);
          return [...cleaned, ...newSparkles];
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [yesScale]);

  const currentNoText = noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)];

  return (
    <div className="page">
      <FloatingHearts />

      <div className="card">
        <div className="emoji-row">💕 🌹 💕</div>

        <h1 className="title-cursive">Permission to kidnap you for a date?</h1>

        <p className="subtitle">
          Yes kro phle fir baki ke details btaunga and No krne ka try kr skti ho... 😁😁All the best love😂
        </p>

        <div className="emoji-row">💖✨💖</div>

        <div className="btn-container">
          {/* YES BUTTON */}
          <button
            id="btn-yes"
            className={`btn btn-yes ${yesScale > 1 ? 'growing' : ''}`}
            onClick={handleYes}
            style={{
              transform: `scale(${yesScale})`,
              zIndex: 10,
            }}
          >
            Yes! 💝
            {sparkles.map((s) => (
              <span
                key={s.id}
                className="sparkle"
                style={{
                  left: `calc(50% + ${s.x}px)`,
                  top: `calc(50% + ${s.y}px)`,
                  animationDelay: `${s.delay}ms`,
                }}
              />
            ))}
          </button>

          {/* NO BUTTON */}
          {isDodging ? (
            <button
              id="btn-no"
              ref={noBtnRef}
              className="btn btn-no dodging"
              onMouseEnter={dodgeButton}
              onTouchStart={dodgeButton}
              onClick={handleNo}
              style={{
                left: `${noPosition.x}px`,
                top: `${noPosition.y}px`,
              }}
            >
              {currentNoText}
            </button>
          ) : (
            <button
              id="btn-no"
              ref={noBtnRef}
              className="btn btn-no"
              onClick={handleNo}
            >
              {noCount === 0 ? 'No' : currentNoText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
