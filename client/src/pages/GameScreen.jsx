// GameScreen.js (New Component)
import React, { useState, useEffect } from 'react';
import './GameScreen.css';


function GameScreen({ heroLives, monsterLives, isAttacking, isMonsterAttacking  }) {
  const [animation, setAnimation] = useState(null)

  useEffect(() => {
    if (isMonsterAttacking) {
      setAnimation('monster');
      const timer = setTimeout(() => setAnimation(null), 500);  // Animation duration
      return () => clearTimeout(timer); // Clear timeout if component unmounts or prop changes
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
    <div className="border border-gray-300 p-4 mb-4 flex justify-between">
      <div>Hero: {heroLives} lives</div>
      <div>
        {/* Monster Animation (conditional) */}
        {animation === 'hero' && (
          <div className="animate-attack">
            <img src="/img/hero-attack.gif" alt="Hero Attack" className="h-20 w-20" />
          </div>
        )}
        {animation === 'monster' && (
          <div className="animate-attack">
            <img src="/img/monster-attack.gif" alt="Monster Attack" className="h-20 w-20" />
          </div>
        )}
        {/* Default Monster Image */}
        {!animation && <img src="/img/monster.png" alt="Monster" className="h-20 w-20" />}
      </div>
      <div>Monster: {monsterLives} lives</div>
    </div>
  );
}

export default GameScreen;