// GameScreen.js
import React, { useState, useEffect } from 'react';
import './GameScreen.css';

function GameScreen({ heroLives, monsterLives, isAttacking, isMonsterAttacking }) {
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (isMonsterAttacking) {
      setAnimation('monster');
      const timer = setTimeout(() => setAnimation(null), 500);
      return () => clearTimeout(timer);
    }
  }, [isMonsterAttacking]);

  useEffect(() => {
    if (isAttacking) {
      setAnimation('hero');
      const timer = setTimeout(() => setAnimation(null), 500);
      return () => clearTimeout(timer);
    }
  }, [isAttacking]);

  return (
    <div className="game-screen"> {/* Changed class name for clarity */}
     <div className="life-display top-left">
        Hero: {heroLives} lives
      </div>
      <div className="life-display top-right">
        Monster: {monsterLives} lives
      </div>

      <div className="character-container"> {/* Container for hero */}
        
        {animation === 'hero' ? (
          <div className="animate-attack">
            <img src="/img/hero-attack.gif" alt="Hero Attack" className="character-image" />
          </div>
        ) : (
          <img src="/img/hero.png" alt="Hero" className="character-image" />
        )}
      </div>
      <div className="character-container"> {/* Container for monster */}
   
       {/* Conditionally render monster image OR attack animation */}
        {animation === 'monster' ? (
          <div className="animate-attack">
            <img src="/img/monster-attack.gif" alt="Monster Attack" className="character-image monster-image" />
          </div>
        ) : (
          <img src="/img/monster.png" alt="Monster" className="character-image monster-image" />
        )}
      </div>
    </div>
  );
}

export default GameScreen;