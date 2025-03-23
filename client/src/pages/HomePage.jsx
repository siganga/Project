// HomePage.js
import React from 'react';
import { useSelector } from 'react-redux';


import UserStreak from './secondary-pages/UserStreak.jsx';



function HomePage() {
  //const streak = useSelector((state) => state.auth.streak);

  const user = useSelector((state) => state.auth.user) || "";
    const streak = user ? user.streak : null;

  return (
    <div className = 'z-10'>
      <h1>Welcome to the Home Page</h1>
     
       <UserStreak />
    </div>
  );
}

export default HomePage;