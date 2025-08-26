import React, { useState, useEffect, useRef } from 'react';
import './GameScreen.css';
import hurtSound from '../assets/sounds/hurt.wav';
import gameMusic from '../assets/music/gameMusic.mp3';

function GameScreen({
  heroLives,
  monsterLives,
  isAttacking,
  isMonsterAttacking,
  score,
  lesson, 
}) {
  const [animation, setAnimation] = useState(null);
  const [heroHurt, setHeroHurt] = useState(false);
  const [monsterHurt, setMonsterHurt] = useState(false);
  const [initialMonsterLives, setInitialMonsterLives] = useState(monsterLives);
  const monsterHurtRef = useRef(false);
  const hurtSoundRef = useRef(new Audio(hurtSound));
  const gameMusicRef = useRef(new Audio(gameMusic));

  const [heroIdleSrc, setHeroIdleSrc] = useState('/img/hero-idle.gif');
  const [heroAttackSrc, setHeroAttackSrc] = useState('/img/hero-idle.gif');
  const [heroHurtSrc, setHeroHurtSrc] = useState('/img/hero-idle.gif');
  const [monsterIdleSrc, setMonsterIdleSrc] = useState('/img/monster-idle.gif');
  const [monsterAttackSrc, setMonsterAttackSrc] = useState('/img/monster-idle.gif');
  const [monsterHurtSrc, setMonsterHurtSrc] = useState('/img/monster-idle.gif');
  const [backgroundSrc, setBackgroundSrc] = useState('/img/game-background.png');

  hurtSoundRef.current.volume = 0.5;
  gameMusicRef.current.loop = true;
  gameMusicRef.current.volume = 0.3;

  useEffect(() => {
    gameMusicRef.current.play().catch((error) => {
      console.error('Autoplay prevented:', error);
    });

    return () => {
      gameMusicRef.current.pause();
      gameMusicRef.current.currentTime = 0;
    };
  }, []);

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
      hurtSoundRef.current.play();
      const timer = setTimeout(() => setHeroHurt(false), 500);
      return () => clearTimeout(timer);
    }
  }, [heroLives]);

  useEffect(() => {
    if (monsterLives < initialMonsterLives && !monsterHurtRef.current) {
      monsterHurtRef.current = true;
      setMonsterHurt(true);
      hurtSoundRef.current.play();
      const timer = setTimeout(() => {
        setMonsterHurt(false);
        monsterHurtRef.current = false;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [monsterLives, initialMonsterLives]);

  useEffect(() => {
    setInitialMonsterLives(monsterLives);
  }, []);

  useEffect(() => {
    async function loadImages() {
      setHeroIdleSrc(lesson?.heroIdleImage ? await getHeroImage('idle', lesson.heroIdleImage) : '/img/hero-idle.gif');
      setHeroAttackSrc(lesson?.heroAttackImage ? await getHeroImage('attack', lesson.heroAttackImage) : '/img/hero-idle.gif');
      setHeroHurtSrc(lesson?.heroHurtImage ? await getHeroImage('hurt', lesson.heroHurtImage) : '/img/hero-idle.gif');
      setMonsterIdleSrc(lesson?.monsterIdleImage ? await getMonsterImage('idle', lesson.monsterIdleImage) : '/img/monster-idle.gif');
      setMonsterAttackSrc(lesson?.monsterAttackImage ? await getMonsterImage('attack', lesson.monsterAttackImage) : '/img/monster-idle.gif');
      setMonsterHurtSrc(lesson?.monsterHurtImage ? await getMonsterImage('hurt', lesson.monsterHurtImage) : '/img/monster-idle.gif');
      setBackgroundSrc(lesson?.backgroundImage ? await getBackgroundImage(lesson.backgroundImage) : '/img/game-background.png');
    }

    loadImages();
  }, [lesson]); 

  const getHeroImage = async (state, imageName) => {
    if (!imageName) {
      return '/img/hero-idle.gif';
    }
    try {
      const response = await fetch(`http://localhost:5000/api/assets/${imageName}`);
      if (response.ok) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } else {
        console.error(`Failed to fetch hero image: ${imageName}`);
        return '/img/hero-idle.gif'; 
      }
    } catch (error) {
      console.error('Error fetching hero image:', error);
      return '/img/hero-idle.gif'; 
    }
  };

  const getMonsterImage = async (state, imageName) => {
    if (!imageName) {
      return '/img/monster-idle.gif';
    }
    try {
      const response = await fetch(`http://localhost:5000/api/assets/${imageName}`);
      if (response.ok) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } else {
        console.error(`Failed to fetch monster image: ${imageName}`);
        return '/img/monster-idle.gif';
      }
    } catch (error) {
      console.error('Error fetching monster image:', error);
      return '/img/monster-idle.gif';
    }
  };

  const getBackgroundImage = async (imageName) => {
    if (!imageName) {
      return '/img/game-background.png';
    }
    try {
      const response = await fetch(`http://localhost:5000/api/assets/${imageName}`);
      if (response.ok) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } else {
        console.error(`Failed to fetch background image: ${imageName}`);
        return '/img/game-background.png';
      }
    } catch (error) {
      console.error('Error fetching background image:', error);
      return '/img/game-background.png';
    }
  };

  return (
    <div className="game-screen" style={{ backgroundImage: `url('${backgroundSrc}')` }}>
      <div className="life-display top-left text-black">Hero: {heroLives} lives</div>
      <div className="score-display top-center text-black">Score: {score}</div>
      <div className="life-display top-right text-black">Monster: {monsterLives} lives</div>

      <div className="character-container">
        {animation === 'hero' ? (
          <div className="animate-attack hero-attack-position ">
            <img src={heroAttackSrc} alt="Hero Attack" className="character-image" />
          </div>
        ) : heroHurt ? (
          <div className="animate-hurt">
            <img src={heroHurtSrc} alt="Hero Hurt" className="character-image" />
          </div>
        ) : (
          <img src={heroIdleSrc} alt="Hero" className="character-image" />
        )}
      </div>

      <div className="character-container">
        {animation === 'monster' ? (
          <div className="animate-attack monster-attack-position">
            <img
              src={monsterAttackSrc}
              alt="Monster Attack"
              className="character-image monster-image"
            />
          </div>
        ) : monsterHurt ? (
          <div className="animate-hurt">
            <img
              src={monsterHurtSrc}
              alt="Monster Hurt"
              className="character-image monster-image"
            />
          </div>
        ) : (
          <img src={monsterIdleSrc} alt="Monster" className="character-image monster-image" />
        )}
      </div>
    </div>
  );
}

export default GameScreen;