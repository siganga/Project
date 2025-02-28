// GameScreen.js
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import './GameScreen.css';
import hurtSound from '../assets/sounds/hurt.wav'; // Import your sound file
import gameMusic from '../assets/music/gameMusic.mp3'; 

function GameScreen({ heroLives, monsterLives, isAttacking, isMonsterAttacking }) {
  const [animation, setAnimation] = useState(null);
  const [heroHurt, setHeroHurt] = useState(false);
  const [monsterHurt, setMonsterHurt] = useState(false);
  const [initialMonsterLives, setInitialMonsterLives] = useState(monsterLives);
   const monsterHurtRef = useRef(false); //useRef to keep track of the animation status
   const hurtSoundRef = useRef(new Audio(hurtSound)); // Create audio ref
   const gameMusicRef = useRef(new Audio(gameMusic));


  hurtSoundRef.current.volume = 0.5; // Set volume to 50% 
  gameMusicRef.current.loop = true; // Loop the music
  gameMusicRef.current.volume = 0.3; //adjust music volume


  useEffect(() => {
    gameMusicRef.current.play().catch(error => {
      console.error("Autoplay prevented:", error);
    }); // Start playing music on mount, handle autoplay block

    return () => {
      gameMusicRef.current.pause(); //pause music when component unmounts.
      gameMusicRef.current.currentTime = 0; //reset music to start.
    };
  }, []); // Run only once on mount and unmount



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

  useEffect(() => {
    if (heroLives < 3) {
      setHeroHurt(true);
      hurtSoundRef.current.play(); // Play sound
      const timer = setTimeout(() => setHeroHurt(false), 500);
      return () => clearTimeout(timer);
    }
  }, [heroLives]);

 useEffect(() => {
    if (monsterLives < initialMonsterLives && !monsterHurtRef.current) { //add check
      monsterHurtRef.current = true; //set to true to prevent triggering again
      setMonsterHurt(true);
      hurtSoundRef.current.play(); // Play sound
      const timer = setTimeout(() => {
        setMonsterHurt(false);
        monsterHurtRef.current = false; //reset
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [monsterLives, initialMonsterLives]);



  useEffect(() => {
  setInitialMonsterLives(monsterLives);
}, []); //run this useEffect only once. //

  return (
    <div className="game-screen">
      <div className="life-display top-left">
        Hero: {heroLives} lives
      </div>
      <div className="life-display top-right">
        Monster: {monsterLives} lives
      </div>

      <div className="character-container">
        {animation === 'hero' ? (
          <div className="animate-attack hero-attack-position ">
            <img src="/img/hero-attack.gif" alt="Hero Attack" className="character-image" />
          </div>
        ) : heroHurt ? (
          <div className="animate-hurt">
            <img src="/img/hero-hurt.gif" alt="Hero Hurt" className="character-image" />
          </div>
        ) : (
          <img src="/img/hero-idle.gif" alt="Hero" className="character-image" />
        )}
      </div>

      <div className="character-container">
        {animation === 'monster' ? (
          <div className="animate-attack monster-attack-position">
            <img src="/img/monster-attack.gif" alt="Monster Attack" className="character-image monster-image" />
          </div>
        ) : monsterHurt ? (
          <div className="animate-hurt">
            <img src="/img/monster-hurt.gif" alt="Monster Hurt" className="character-image monster-image" />
          </div>
        ) : (
          <img src="/img/monster-idle.gif" alt="Monster" className="character-image monster-image" />
        )}
      </div>
    </div>
  );
}

export default GameScreen;